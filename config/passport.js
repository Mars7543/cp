var LocalStrategy = require("passport-local").Strategy;

// load up user model
var User = require("../models/user");

module.exports = function(passport){
    // ======================
    // passport session setup
    // ======================
    
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
    
    // ============
    // LOCAL SIGNUP
    // ============
    
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
                        
                        newUser.firstName = req.body.firstName;
                        newUser.lastName  = req.body.lastName;
                        
                        newUser.organization = req.body.organization;
                        
                        if (newUser.organization === "charity"){
                            newUser.charity.name = req.body.charityName;
                            newUser.programmer = undefined;
                        } else {
                            newUser.charity = undefined;
                        }
                        
                        console.log("user created");
                        // save user
                        newUser.save(function(err) {
                            if (err) {
                                console.log("error");
                                throw err;
                            }
                            console.log("USER: " + newUser);
                            return done(null, newUser);
                        });
                    }
                }
            });
        });
    }));
    
    // ============
    // LOCAL SIGNIN
    // ============
    
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function(req, email, password, done){
        User.findOne({'local.email' : email}, function(err, user){
            console.log("Checkpoint 1!");
            if (err){
                console.log("Error!");
                return done(err);
            }
            if(!user){
                console.log("No user found!");
                return done(null, false);
            }
            if (!user.validPassword(password)){
                console.log("Invalid Password!");
                return done(null, false);
            }
            console.log("Checkpoint 2!");
            return done(null, user);
        });
    }));
};