const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: 'Your google client Id',
    clientSecret: 'Your secret',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done)=>{
    done(null, user);
})
passport.deserializeUser((obj, done)=>{
    done(null, obj);
})