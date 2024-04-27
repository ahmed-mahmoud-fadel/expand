function validatePassword(password) {
    // Example validation: Minimum eight characters, at least one letter and one number
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!regex.test(password)) {
        return false;
    }
    return true;
}

module.exports = { validatePassword };

// function validatePassword(password) {
//     // Example validation: Minimum eight characters, at least one letter and one number
//     const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//     return regex.test(password);
// }