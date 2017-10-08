let tokenExpirationInSeconds = require('../config/env.config.js').config.jwt_expiration_in_seconds,
    jwtSecret = require('../config/env.config.js').config.jwt_secret,
    jwt = require('jsonwebtoken')
    ;

exports.generateJWT = (body) => {
    try {
        let expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + (tokenExpirationInSeconds / 3600));
        body.expiresAt = expiresAt;
        return jwt.sign(body, jwtSecret);
    } catch (err) {
        throw 'JwtExceptionError';
    }
};