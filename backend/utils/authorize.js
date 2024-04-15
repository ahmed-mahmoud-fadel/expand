/**
 * Middleware to authorize user roles.
 * This function checks if the authenticated user has any of the specified roles 
 * and allows access to the route if the condition is met. If the user's role is not 
 * in the list of authorized roles, it responds with an "Unauthorized" status.
 */

function authorize(...roles) {
    // roles param can be a single role string (e.g., 'admin') or an array of roles
    return (req, res, next) => {
      if (req.auth && roles.length && !roles.includes(req.auth.role)) {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // authentication and authorization successful
      next();
    };
}

module.exports = authorize;