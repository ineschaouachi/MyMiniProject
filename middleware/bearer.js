const jwt = require('jsonwebtoken');

const passport = require('passport');
const adminSchema = require('../models/adminSchema');

const LocalStrategy = require('passport-http-bearer').Strategy

passport.use(new LocalStrategy(
    async function (token, done) {
        const decoded = jwt.verify(token, 'longstringsecret')

        const response = await adminSchema.findById(decoded.id)
        if (!response) { return done(null, false); }
        return done(null, response);
    }
));