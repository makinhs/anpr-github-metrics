const jwt = require('jsonwebtoken'),
    secret = require('../config/env.config.js').config.jwt_secret,
    crypto = require('crypto');

exports.verifyRefreshBodyField = (req, res, next) => {
    if(req.body && req.body.refreshToken){
        return next();
    }else{
        return res.status(400).send({error: 'need to pass refreshToken field'});
    }
};

exports.validRefreshNeeded = (req, res, next) => {
    let b = new Buffer(req.body.refreshToken, 'base64');
    let refreshToken = b.toString();
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64");
    if (hash === refreshToken) {
        req.body = req.jwt;
        return next();
    }else{
        return res.status(400).send({error: 'Invalid refresh token'});
    }
};


exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], secret);


                return next();
            }

        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }

};

exports.verifyLogin = (req, res, next) => {

    //todo: it needs to take a type: normal_login/facebook_login, etc.
    //todo: verify credentials, then populate it.

    req.body = {
        userId: 'customUserId',
        email: 'testemail@gmail.com',
        permissionLevel: '12',
        createdAt: new Date(),
        modifiedAt: new Date()
    };
    return next();


};