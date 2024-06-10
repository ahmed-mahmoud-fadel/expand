const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const router = express.Router();

const User = require('../models/User');
const TokenRevocation = require('../models/TokenRevocation');

const { validatePassword } = require('../utils/passwordUtils');
const {generateToken} = require('../utils/jwt');
const authJwt = require('../utils/authJwt');
const authorize = require('../utils/authorize');
const enforceAccessControl = require('../utils/enforceAccessControl');
const upload = require('../utils/multer');
const s3 = require('../utils/aws-s3');

router.use(authJwt());


// List all Users with pagination - Admin
router.get('/', authorize('admin'), async (req, res) => {
    const count = await User.countDocuments();
    const { page = 1, limit = 6 } = req.query;
    try{
        const users = await User.find()
            .select('-passwordHash')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        res.status(200).json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage:  parseInt(page, 10),
        });
    } catch (error) {
        console.error("Error while retrieving users:", err);
        res.status(500).json({ message: 'An error occurred while fetching the users.' });
    }
});

// Get User by ID (Self or Admin)
router.get('/:id', authorize('admin', 'user'), enforceAccessControl(), async (req, res) => {
    try{
        const user = await User.findById(req.params.id).select('-passwordHash');
        if (!user) {
            res.status(500).json({ message: 'The user with the given ID was not found.' });
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the user.' });
    }
});

// Update User Details (Self or Admin)
router.put('/:id', authorize('admin', 'user'), enforceAccessControl(), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone:  req.body.phone,
                gender: req.body.gender,
                status: req.body.status,
                country: req.body.country,
                city: req.body.city,
                street: req.body.street,
                zip: req.body.zip,
                companyName: req.body.companyName,
                companyLocation: req.body.companyLocation,
                companyWebsite: req.body.companyWebsite
            },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.status(200).send(user);
    } catch (error) {
        console.error('Failed to update user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete User by ID (Self or Admin)
router.delete('/:id', authorize('admin', 'user'), enforceAccessControl(), async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({ message: 'The user is deleted!' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Upload Profile Image (Self of Admin)
router.post('/:id/profile-image', authorize('admin', 'user'), enforceAccessControl(), upload.single('file'), async (req, res) => {
    const file = req.file;
    const userId = req.params.id;

    if (!file) {
        return res.status(400).send('Please upload a file.');
    }

    const allowedTypes = /jpeg|jpg|png/;
    const extension = allowedTypes.test(file.originalname.toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (!(extension && mimeType)) {
        return res.status(400).json({message: 'Invalid file type. Only JPEG, JPG and PNG files are allowed.'});
    }

    const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `profile-images/${userId}-${Date.now()}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read' 
    };

    try {
        const data = await s3.upload(s3Params).promise();
        await User.findByIdAndUpdate(userId, { photo: data.Location });
        res.status(200).json({ message: 'Profile image uploaded successfully!', photo: data.Location });
    } catch (err) {
        console.error('Error uploading image to S3:', err);
        res.status(500).json({ message: 'Failed to upload profile image.' });
    }
});

// Change User Password
router.patch('/:id/change-password', authorize('admin', 'user'), enforceAccessControl(), async (req, res) => {
    if (!validatePassword(req.body.newPassword)) {
        return res.status(400).json({
            message: 'Password does not meet complexity requirements. It must be at least 8 characters long and include both letters and numbers.'
        });
    }
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Proceed to check if the current password matches
        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect.' });
        }

        // If the current password is correct, hash the new password and update the user's passwordHash
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.passwordHash = newHashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password successfully changed.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while attempting to change the password.' });
    }
});

// User Authentication (Login)
router.post('/auth/login', async (req,res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Authentication failed' });
        }

        // Check if user has verified their email
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email before logging in' });
        }

        // Check if the password is correct
        const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Authentication failed' });
        }

        // Generate a token for the user
        const token = await generateToken(user);
        res.status(200).json({ message: 'Authentication successful', id: user.id, token });

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    }
});

// User Registration
router.post('/auth/register', async (req, res) => {

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationUrl = `${process.env.FRONT_URL}/${verificationToken}`;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            country: req.body.country,
            phone: req.body.phone,
            email: req.body.email,
            username: req.body.username,
            companyName: req.body.companyName,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            verificationToken: verificationToken,
        });

        user = await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Email Verification',
            html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error sending verification email.' });
            }
            console.log('Verification email sent: ' + info.response);
            res.send({ message: 'Success. Verification email sent.' });
        });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ message: 'An error occurred during the registration process.' });
    }
});

// Handle the Verification Link
router.get('/auth/verify-email', async (req, res) => {
    const token = req.query.token;

    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token.' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.send({ message: 'Email verified successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred during email verification.' });
    }
});

// Validate JWT Token
router.post('/auth/validate-token', authorize('admin', 'user'), (req, res) => {
    res.status(200).json({ message: 'Successfully logged In.' });
});

//api for logout
router.post('/auth/logout', authorize('admin', 'user'), async (req, res) => {
    try {
        const { jti, exp } = req.auth;
        const expiresAt = new Date(exp * 1000); // Convert to milliseconds
        let tokenrevocation = new TokenRevocation({ jti: jti, expiresAt: expiresAt })
        tokenrevocation = await  tokenrevocation.save();
        res.status(200).json({ message: 'Successfully logged out.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during the logout process.' });
      }
})


module.exports = router;
