const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
const { v4: uuidv4 } = require('uuid');
const TokenRevocation = require('../models/TokenRevocation');

/**
 * Generates a JWT for a user with a payload containing the user's ID, role, 
 * and a unique JWT ID (jti) for potential revocation. The token is set to expire in 24 hours.
 */
function generateToken(user) {
    const payload = {
        userId: user._id,
        role: user.role, 
        jti: uuidv4(),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // Adds 24 hours to the current time
    };
    return jwt.sign(payload, process.env.secret);
}

/**
 * Verifies the integrity and validity of a JWT token using the secret key. 
 * It will throw an error if the token is invalid, expired, or tampered with.
 */
const verifyToken = (token) => {
    return jwt.verify(token, process.env.secret);
};

/**
 * Checks if a given token has been revoked based on its 'jti' (JWT ID).
 * Useful for invalidating tokens that might still be within their validity period.
 */
async function isTokenRevoked(req, payload) {
    try {
        const tokens = await TokenRevocation.find({ jti: payload.payload.jti });        
        if (tokens && tokens.length > 0) {
            // Token is revoked
            return true;
        } else {
            // Token is not revoked
            return false;
        }
    } catch (err) {
        console.error("Error checking token revocation:", err);
    }
}


module.exports = { generateToken, isTokenRevoked, verifyToken };
