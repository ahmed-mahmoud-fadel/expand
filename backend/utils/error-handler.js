/**
 * Global error handling middleware for Express applications. This function intercepts 
 * and handles errors that occur during request processing, providing a centralized 
 * mechanism for error response and logging.
 *
 * It specifically handles:
 * - Unauthorized errors, typically thrown by JWT authentication middleware when 
 *   access is attempted without valid authentication or insufficient permissions.
 * - Validation errors, which occur when request data does not meet validation criteria 
 *   set by the application or middleware.
 *
 * This function also logs detailed information about the error, including the request 
 * body, query parameters, and route parameters to assist in debugging. For any error 
 * types not explicitly handled, it defaults to sending a 500 Internal Server Error response.
 */
function errorHandler(err, req, res, next) {
    
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({message: "The user is not authorized"});
    }
    
    console.error(`[Error] ${err.message}`, { error: err, body: req.body, query: req.query, params: req.params });

    if (err.name === 'ValidationError') {
        //  validation error
        return res.status(400).json({message: "Invalid request data"});
    }

    // Include more specific error types if needed

    // default to 500 server error
    return res.status(500).json({message: "An unexpected error occurred", error: err.message});
}


module.exports = errorHandler;