function enforceAccessControl() {
    return async (req, res, next) => {
        const userId = req.params.id;
        const requestingUser = req.auth.userId;
        const requestingUserRole = req.auth.role;
        
        // Allow the resource owner or an admin to proceed.
        if (userId !== requestingUser && requestingUserRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied. You do not have permission.' });
        }

        next(); // Access control passed, proceed to the next middleware or route handler.
    };
}

module.exports = enforceAccessControl;