/**
 * Middleware to authorize user roles.
 * This function checks if the authenticated user has any of the specified roles 
 * and allows access to the route if the condition is met. If the user's role is not 
 * in the list of authorized roles, it responds with an "Unauthorized" status.
 */

function authorize(...roles) {
  try {
    return (req, res, next) => {
      if (req.auth && roles.length && !roles.includes(req.auth.role)) {
        return res.status(401).json({ message: 'Unauthorized. Token is invalid or expired.' });
      }
      next();
    };
  } catch (err) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = authorize;