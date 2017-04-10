var LocalStrategy = require("passport-local").Strategy;

// load up models
var User        = require("../models/user");
var Programmer  = require("../models/programmer");
var Charity     = require("../models/charity");

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
        usernameField: 'email',    // specify username and password fields
        passwordField: 'password',
        passReqToCallback: true    // pass entire request to callback
    }, 
    function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({'local.email' : email}, function(err, user){
                if (err){
                    req.flash("error", "true");
                    req.flash('internalServerError', 'Something went wrong :( Please try again later');
                    return done(err);
                } else {
                    if (user) {
                        req.flash("error", "true");
                        req.flash('signupError', 'That email is already taken.');
                        return done(null, false);
                    } else {
                        // if there isnt' a user with that email create user
                        
                        var newUser = new User();
                        
                        // set user's local credentials
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        
                        // set user's first/last name
                        newUser.firstName = req.body.firstName;
                        newUser.lastName  = req.body.lastName;
                        
                        // set their affiliation (charity/programmer)
                        newUser.organization = req.body.organization;
                        
                        // if the user is a programmer, make programmer object and link the id to the user
                        if (newUser.organization === "programmer") {
                            var newProgrammer = new Programmer();
                            
                            newProgrammer.save();
                            
                            newUser.programmer = newProgrammer._id;
                            
                        // if the user is a charity, make a charity object, give it a name, then link the id to the user
                        } else if (newUser.organization === "charity") {
                            var newCharity = new Charity();
                            newCharity.name = req.body.charityName;
                            
                            newCharity.save(function(err){
                                if (err) {
                                    req.flash("error", "true");
                                    req.flash('internalServerError', 'Something went wrong :( Please try again later');
                                    
                                    return done(err); 
                                }
                            });
                            
                            newUser.charity = newCharity._id;
                        }
                        
                        // save user
                        newUser.save(function(err) {
                            if (err) {
                                req.flash("error", "true");
                                req.flash('internalServerError', 'Something went wrong :( Please try again later');
                                
                                return done(err);
                            }
                            
                            req.flash("success", "true");
                            req.flash("signupSuccess", 'Welcome to CharityProgrammers, ' + newUser.firstName[0].toUpperCase() + newUser.firstName.slice(1) + "!");
                            return done(null, newUser);
                        });
                    }
                }
            });
        });
    }));
    
    // ============
    // LOCAL LOGIN
    // ============
    
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function(req, email, password, done){
        // find user with given email
        User.findOne({'local.email' : email}, function(err, user){
            if (err){
                req.flash("error", "true");
                req.flash('internalServerError', 'Something went wrong :( Please try again later');
                return done(err);
            }
            
            // if no user exists or password is incorrect send error
            if (!user || !user.validPassword(password)){
                req.flash("error", "true");
                req.flash('loginError', 'Invalid email or password');
                return done(null, false);
            }
            
            // if no errors occurred then send back user
            req.flash("success", "true");
            req.flash('loginSuccess', 'Welcome back ' + user.firstName[0] + user.firstName.slice(1) + "!");
            return done(null, user);
        });
    }));
};