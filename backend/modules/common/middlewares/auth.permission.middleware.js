'use strict';

const jwt = require('jsonwebtoken'),
    config = require('../config/env.config').config,
    secret = require('../config/env.config').config.jwt_secret;

exports.minimumPermissionLevelRequired = (requiredPermissionLevel) => {
    return (req, res, next) => {

        let userPermissionLevel = parseInt(req.jwt.permissionLevel);
        let userId = req.jwt.userId;
        if (userPermissionLevel & requiredPermissionLevel) {
            return next();
        } else {
            return res.send(403);
        }
    };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {

    let userPermissionLevel = parseInt(req.jwt.permissionLevel);
    let userId = req.jwt.userId;
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next();
    } else {
        if (userPermissionLevel & config.PERMISSION_LEVELS.MAX_PERMISSION) {
            return next();
        } else {
            return res.send(403);
        }
    }

};

exports.onlySameUserOrParentOrAdminCanDoThisAction = (req, res, next) => {

    let userPermissionLevel = parseInt(req.jwt.permissionLevel);
    let userId = req.jwt.userId;
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next();
    } else {
        if (userPermissionLevel & config.PERMISSION_LEVELS.REGULAR_PERMISSION) {
            return next();
        } else {
            return res.send(403);
        }
    }

};

exports.onlySameFromFamilyOrAdminCanDoThisAction = (req, res, next) => {

    let userPermissionLevel = parseInt(req.jwt.permissionLevel);
    let familyId = req.jwt.familyId;
    if (req.params && req.params.familyId && familyId === req.params.familyId) {
        return next();
    } else {
        if (userPermissionLevel & config.PERMISSION_LEVELS.MAX_PERMISSION) {
            return next();
        } else {
            return res.status(403).send();
        }
    }

};

exports.onlyAdminFieldUpdatedAllowed = (adminAllowedFields) => {
    return (req, res, next) => {

        let userPermissionLevel = parseInt(req.jwt.permissionLevel);
        let userId = req.jwt.userId;
        let needPermissionLevel = false;

        adminAllowedFields.forEach((field) => {
            if (req.body[field]) {
                needPermissionLevel = true;
            }
        });

        if (!needPermissionLevel) {
            return next();
        } else if (userPermissionLevel & config.PERMISSION_LEVELS.MAX_PERMISSION) {
            return next();
        } else {
            return res.status(403).send();
        }
    };
};

exports.sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;

    if (req.params.userId !== userId) {
        return next();
    } else {
        return res.status(400).send();
    }

};
