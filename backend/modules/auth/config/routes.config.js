let AuthController = require('../controllers/auth.controller.js');
let JwtMiddleware = require('../../common/middlewares/auth.validation.middleware.js');

let VerifyUserMiddleware = require('../middlewares/verify.user.middleware');

exports.routesConfig = function (server) {

    server.post('/auth', [
        VerifyUserMiddleware.hasValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthController.login
    ]);

    server.post('/auth/refresh', [
        JwtMiddleware.validJWTNeeded,
        JwtMiddleware.verifyRefreshBodyField,
        JwtMiddleware.validRefreshNeeded,
        AuthController.login
    ]);
};
