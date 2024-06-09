const { expressjwt: expressJwt } = require('express-jwt');
const { isTokenRevoked } = require('../utils/jwt');

/**
 * Configures and returns the express-jwt middleware for use in the application.
 * This middleware automatically validates JSON Web Tokens (JWTs) and sets the `req.auth`
 * object for authenticated routes. It uses a secret key from environment variables for
 * token verification and supports only the HS256 algorithm.
 *
 * Additionally, it integrates a token revocation check, allowing the application to deny
 * access based on revoked tokens, enhancing security by enabling token invalidation
 * even before their expiration.
 *
 * The middleware is configured to bypass authentication for specific public paths,
 * such as user login and registration, and certain blog content that is meant to be
 * publicly accessible without authentication.
 */
function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isTokenRevoked
    }).unless({
        path: [
            // Paths for user login and registration
            { url: `${api}/user/auth/login`, methods: ['POST'] },
            { url: `${api}/user/auth/register`, methods: ['POST'] },
            { url: `${api}/user/auth/verify-email`, methods: ['GET'] },
            { url: `${api}/contact`, methods: ['POST'] },
            // paths for blog 
            { url: /\/api\/v1\/blog\/active(.*)/, methods: ['GET'] },
            // paths for pricing plan
            { url:/\/api\/v1\/pricingPlans(.*)/, methods: ['GET'] },
            // paths for solution
            { url:/\/api\/v1\/solution(.*)/, methods: ['GET'] },
            // paths for products
            { url:/\/api\/v1\/product(.*)/, methods: ['GET'] },
            { url:/\/api\/v1\/engine(.*)/, methods: ["GET"] },
        ]
    })
}


module.exports = authJwt;
