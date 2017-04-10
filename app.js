var bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    flash                 = require("connect-flash"),
    bcrypt                = require("bcrypt-nodejs"),
    express               = require("express"),
    session               = require("express-session"),
    app                   = express();
    
// import routes
var indexRoutes      = require("./routes"),
    charityRoutes    = require("./routes/charity"),
    programmerRoutes = require("./routes/programmer");

// MONGO CONFIG
var configDB = require("./config/database");
mongoose.connect(configDB.url);

require("./config/passport")(passport); // pass passport for config function

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static((__dirname + "/public")));
app.use(bodyParser.urlencoded({extended: true}));

// PASSPORT CONFIG
app.use(session({ 
    secret: 'ilovescotchscotchyscotchscotch',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());  // use flash mesages

app.use(function(req, res, next) {
    // sending user variable and all req.flash messages
    // I know. its a lot ...
    res.locals.currentUser             = req.user;
    res.locals.error                   = req.flash("error");
    res.locals.success                 = req.flash("success");
    res.locals.internalServerError     = req.flash("internalServerError");
    res.locals.signupError             = req.flash("signupError");
    res.locals.loginError              = req.flash("loginError");
    res.locals.permissionsError        = req.flash("permissionsError");
    res.locals.signupSuccess           = req.flash("signupSuccess");
    res.locals.loginSuccess            = req.flash("loginSuccess");
    res.locals.logoutSuccess           = req.flash("logoutSuccess");
    next();
}); 

// use routes
app.use(indexRoutes);
app.use(charityRoutes);
app.use(programmerRoutes);

// start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("CharityProgrammers running...");
});