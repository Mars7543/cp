var LocalStrategy = require("passport-local").Strategy;

// load up user model
var User = require("../models/user");

module.exports = function(passport){
    // used to serialize user for this session
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    
    // used to deserialize user
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
           done(err, user); 
        });
    });
    
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({'local-email' : email}, function(err, user){
                if (err){
                    return done(err);
                } else {
                    if (user) {
                        console.log("user exists");
                        return done(null, false);
                    } else {
                        // if there is user with that email
                        // create user
                        var newUser = new User();
                        
                        // set user's local credentials
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        
                        console.log("user created");
                        // save user
                        newUser.save(function(err) {
                            if (err) {
                                console.log("error");
                                throw err;
                            }
                            console.log("user successfully created");
                            return done(null, newUser);
                        });
                    }
                }
            });
        });
    }));
};