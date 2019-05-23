// Using passport-localstrategy for authentication
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('./config');

// Load User Model
const User = require('./models/User');

module.exports = function (passport) {
    var options = {};
    options.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("jwt");
    options.secretOrKey = config.secret;
    passport.use(new JWTStrategy(options, function (jwt_payload, done) {
        User.findOne({ email: jwt_payload.email }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

};