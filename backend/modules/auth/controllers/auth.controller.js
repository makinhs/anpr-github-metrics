let tokenExpirationInSeconds = require('../../common/config/env.config.js').jwt_expiration_in_seconds,
    jwtSecret = require('../../common/config/env.config.js').jwt_secret,
    jwt = require('jsonwebtoken')
    ;
let crypto = require('crypto');
let uuid = require('node-uuid');
exports.login = (req, res) => {
    try {

        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");

        let expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + (tokenExpirationInSeconds / 3600));
        req.body.expiresAt = expiresAt;
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        let b = new Buffer(hash);
        let refreshToken = b.toString('base64');
        return res.status(201).send({id: token, refreshToken : refreshToken});
    } catch (err) {
        return res.status(500).send(err);
    }
};

exports.refreshToken = (req, res) => {
    try {
        let expiresAt = new Date();
        req.body = req.jwt;
        expiresAt.setHours(expiresAt.getHours() + (tokenExpirationInSeconds / 3600));
        req.body.expiresAt = expiresAt;
        let token = jwt.sign(req.body, jwtSecret);
        return res.status(201).send({id: token});
    } catch (err) {
        return res.status(500).send(err);
    }
};

