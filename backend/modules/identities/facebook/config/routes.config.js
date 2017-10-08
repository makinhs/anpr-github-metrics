let passport = require('../services/passport.service.js').passport;
let FacebookController = require('../controllers/facebook.controller.js');
let VerifyAuthMiddleware = require('../middlewares/verify.auth.middleware.js');

let AuthValidationMiddleware = require('../../../common/middlewares/auth.validation.middleware');
let AuthPermissionMiddleware = require('../../../common/middlewares/auth.permission.middleware');

let config = require('../../../common/config/env.config').config;
exports.routesConfig = function (server) {
    let fbConfig = {
        callbackURL: config.providers.facebook.callback_url,
    };

    server.use(passport.initialize());
    server.use(passport.session());
    server.get('/auth/facebook', [
        function (req, res, next) {

            let callbackURL = '';
            if (req.query.devMode) {
                callbackURL = `http://localhost:${config.port}/auth/facebook/callback` + "?invite=" + req.query.invite;
            } else {
                callbackURL = fbConfig.callbackURL + "?invite=" + req.query.invite;
            }
            if (req.query.devRedirect) {
                callbackURL += '&devRedirect=true';
            }

            passport.authenticate("facebook", {scope: ["email"], callbackURL: callbackURL})(req, res, next);
        }
    ]);

    let successRedirect = '/auth/facebook/me';
    server.get('/users/facebook/callback', [
        function (req, res, next) {
            let callbackURL = fbConfig.callbackURL + "?invite=" + req.query.invite;
            if (req.query.devRedirect && req.query.devRedirect == 'true') {
                callbackURL += '&devRedirect=true';
            }
            let failureRedirect = '/batatinha';
            if(req.query.invite && req.query.invite !== 'undefined'){
                failureRedirect += `/${req.query.invite}`;
            }
            passport.authenticate("facebook", {
                callbackURL: callbackURL,
                failureRedirect: failureRedirect,
                session: false,
                scope: ['email']
            })(req, res, next);
        },
        VerifyAuthMiddleware.isAuthenticated,
        FacebookController.auth
    ]);

    server.get('/users/:userId/identities/facebook/profilePicture',
        AuthValidationMiddleware.validJWTNeeded,
        AuthPermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        FacebookController.getProfilePicture
    );

    server.get('/families/:familyId/users/:userId/identities/facebook/profilePicture',
        AuthValidationMiddleware.validJWTNeeded,
        AuthPermissionMiddleware.onlySameFromFamilyOrAdminCanDoThisAction,
        FacebookController.getProfilePicture
    );

};


