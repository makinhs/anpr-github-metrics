let config = require('../../../common/config/env.config').config;

let passport = require('passport'),
    util = require('util'),
    FacebookStrategy = require('passport-facebook').Strategy;

// Passport session setup.
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
        clientID: config.providers.facebook.api_key,
        clientSecret: config.providers.facebook.api_secret,
        callbackURL: config.providers.facebook.callback_url,
        failureRedirect: "/",
        profileFields: ['id', 'name', 'gender', 'displayName', 'picture.type(large)', 'profileUrl', 'email', 'birthday', 'cover', 'devices']
    },
    function (accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;
        process.nextTick(function () {
            //Check whether the User exists or not using profile.id
            return done(null, profile);
        });
    }
));

exports.passport = passport;