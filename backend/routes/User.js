const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/User');
const TokenRevocation = require('../models/TokenRevocation');

const { validatePassword } = require('../utils/passwordUtils');
const {generateToken} = require('../utils/jwt');
const authJwt = require('../utils/authJwt');
const authorize = require('../utils/authorize');
const enforceAccessControl = require('../utils/enforceAccessControl');

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
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the users.' });
    }
});

//  Get User Details
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

// Update user information
router.put('/:id', authorize('admin', 'user'), enforceAccessControl(), async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone:  req.body.phone,
            gender: req.body.gender,
            country: req.body.country,
            city: req.body.city,
            street: req.body.street,
            zip: req.body.zip,
            photo: req.body.photo,
            company: req.body.company,
        },
        { new: true }
    );

    if (!user) {
        return res.status(400).json({ message: 'The user cannot be updated!' });
    } else {
        res.send(user);
    }
});

// login user
router.post('/auth/login', async (req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = await generateToken(user);
            res.status(200).json({ message: "Authentication successful", id: user.id, token: token });
        } else {
            res.status(400).json({ message: 'Authentication failed' });
        }
    } catch(error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

// rgister user
router.post('/auth/register', async (req,res)=>{
    if (!validatePassword(req.body.password)) {
        return res.status(400).json({
            message: 'Password does not meet complexity requirements. It must be at least 8 characters long and include both letters and numbers.'
        });
    }
    try{
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            country: req.body.country,
            phone: req.body.phone,
            email: req.body.email,
            username: req.body.username,
            companyName: req.body.companyName,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            
        })
        user = await user.save();
        res.send({message: "Success"});
    } catch (err) {
        // Check if the error is related to unique constraint violation
        if (err.code === 11000) {
            // MongoDB duplicate key error code
            res.status(400).json({ message:'User already exists.' });
        } else {
            // Handle other possible errors
            console.error(err); // Log the error for debugging purposes
            res.status(500).json({ message: 'An error occurred during the registration process.' });
        }
    }
})

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

//api for forgot-password
router.post('/auth/forgot-password', authorize('admin', 'user'), async (req, res) => {
    
})

//api for reset-password
router.post('/auth/reset-password', async (req, res) => {
    
})

// Change User Password
router.patch('/:id/change-password', authorize('admin', 'user'), enforceAccessControl(), validatePassword, async (req, res) => {
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

        res.json({ message: 'Password successfully changed.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while attempting to change the password.' });
    }
});

// Admin Delete specific user
router.delete('/:id', authorize('admin'), enforceAccessControl(), async (req, res) => {
    User.findByIdAndDelete(req.params.id).then(user => {
        if (user) {
            res.status(200).json({ success: true, message: 'The user is deleted!' });
        } else {
            res.status(404).json({ success: false, message: "User not found!" });
        }
    }).catch(err => {
        res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
