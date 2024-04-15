function validatePassword(req, res, next) {
    const { newPassword } = req.body;
    // Example validation: Minimum eight characters, at least one letter and one number
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!regex.test(newPassword)) {
        return res.status(400).json({
            message: 'Password does not meet complexity requirements. It must be at least 8 characters long and include both letters and numbers.'
        });
    }

    next();
}

module.exports = { validatePassword };

// function validatePassword(password) {
//     // Example validation: Minimum eight characters, at least one letter and one number
//     const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//     return regex.test(password);
// }