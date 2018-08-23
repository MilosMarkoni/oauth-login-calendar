const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null,user);
    })
});

passport.use(
    
    new GoogleStrategy({
        //options for the strategy
        callbackURL: '/oauth2callback',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

    },
    (accessToken, refreshToken, profile, done) => {
        keys.session.accessTokenTemp = accessToken;

        // check if user already exists in our db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // Alredy have the user
                console.log('User is: ', currentUser.username);
                done(null,currentUser);
            } else {
                // If not, create a new user 
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log('New user created:' + newUser);
                    done(null,newUser);
                })       
            }
        })        
    })

);
