let jwtService = require('../../../common/services/jwt.service');
const config = require('../../../common/config/env.config').config;
let crypto = require('crypto');
let uuid = require('node-uuid');
let secret = require('../../../common/config/env.config').config.jwt_secret;
// let facebookDao = require('../daos/facebook.dao.js');
// let userDao = require('../../../users/daos/user.dao');

exports.auth = (req, res) => {

    let refreshId = req.user.ourlyId + secret;
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
    let jwtBody = {
        userId: req.user.ourlyId,
        // permissionLevel: req.user.permissionLevel,
        provider: 'facebook',
        name: req.user.displayName,
        identityId: req.user.id,
        refreshKey: salt
    };
    if (req.user.familyId) {
        jwtBody.familyId = req.user.familyId;
    }
    let jwt = jwtService.generateJWT(jwtBody);
    let redirectUrl = req.query.devRedirect && req.query.devRedirect == 'true' ? 'http://localhost:8100' : config.appEndpoint;

    let b = new Buffer(hash);
    let refreshToken = b.toString('base64');

    if (req.user.photos[0] && req.user.photos[0].value) {
        // <----- GRAB FB PROFILE PICTURE HERE ;) ----->
    }

    res.redirect(redirectUrl + `/#/home/fb/${jwt}/${refreshToken}`);
};

exports.getProfilePicture = (req, res) => {
    return res.status(501).send();
};