var bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bcrypt                = require("bcrypt-nodejs"),
    express               = require("express"),
    session               = require("express-session"),
    app                   = express();
    
// MONGO CONFIG
var configDB = require("./config/database");
mongoose.connect(configDB.url);

require("./config/passport")(passport); // pass passport for config function

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

// PASSPORT CONFIG
app.use(session({ 
    secret: 'ilovescotchscotchyscotchscotch',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", function(req, res){
    if (req.user) {
        console.log(req.user);
    } else {
        console.log("No user logged in");
    }
    res.render("home", {cp: "n"}); 
});

// ==============
// SIGN UP ROUTES
// ==============

app.post("/signup", passport.authenticate('local-signup', {
    successRedirect: "/",
    failureRedirect: "/register",
}));

app.get("/register", function(req, res) {
   res.render("authentication/register"); 
});

app.get("/login", function(req, res){
    res.render("authentication/login");
});

app.post("/login", passport.authenticate('local-login', {
    successRedirect: "/",
    failureRedirect: "/login"
}));

// ==============
// CHARITY ROUTES
// ==============
/*
app.get("/charity/job", function(req, res){
    Job.findOne({}).populate("applicants").exec(function(err, foundJob){
        if (err) {
            console.log(err);
        }  else {
            res.render("charity/index", {cp: "c", r: "index", applicants: foundJob.applicants}); 
        }
    })
});

app.get("/charity/job/new", function(req, res){
   res.render("charity/new", {cp: "c", r: "new"}); 
});

app.post("/charity/job", function(req, res){
    Job.create(req.body.job, function(err, newJob){
        if (err){
            console.log(err);
        } else {
            res.redirect("/charity/job");
        }
    });
});

// =================
// PROGRAMMER ROUTES
// =================

app.get("/programmer/job", function(req, res){
   res.render("programmer/index", {cp: "p", r: "index"}); 
});

app.get("/programmer/job/all", function(req, res){
    Job.find({}, function(err, allJobs){
        if (err) {
            console.log(err);
        } else {
            res.render("programmer/all", {cp: "p", r: "view", jobs: allJobs}); 
        }
    });
});

app.get("/programmer/job/:id/", function(req, res) {
    Programmer.findOne({name: "Julio"}, function(err, programmer){
        if (err){
            console.log(err);
        } else {
            Job.findById(req.params.id, function(err, job){
                if (err) {
                    console.log(err);
                } else { 
                    job.applicants.push(programmer._id); 
                    job.save();
                    res.redirect("/programmer/job");
                }
            });
        }
    });
}); */

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("CharityProgrammers running...");
});