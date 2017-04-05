var bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    express               = require("express"),
    app                   = express();

// MONGOOSE CONFIG
mongoose.connect("mongodb://localhost/charity_programmers");

// PROGRAMMER MODEL
var Programmer = mongoose.model("Programmer", new mongoose.Schema({
    name: String,
    description: {type: String, default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat facilisis sollicitudin. Quisque a sodales tortor. Donec libero augue, consequat vel bibendum quis, lacinia in mi. Donec vel sagittis sem. In consequat sem molestie metus dapibus, nec maximus urna cursus. Ut volutpat ornare sollicitudin. In facilisis molestie lacus ut ultrices. Praesent tincidunt neque in felis volutpat eleifend. Donec maximus tortor ut arcu imperdiet cursus. Phasellus lacinia, dui ut laoreet vestibulum, nunc nibh imperdiet lorem, sit amet mollis nulla nibh sed tortor."},
    rating: {type: Number, default: 3}
}));

// USER MODEL
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

var User = mongoose.model("User", userSchema);

// JOB MODEL
var Job = mongoose.model("Job", new mongoose.Schema({
    title: String,
    description: String,
    charityName: String,
    applicants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Programmer"
        }
    ], 
    status: {type: Number, default: 1}
}));

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "These secrets are very sketchy ... secret ....",
    resave: false,
    saveUninitialized: false
}));

app.get("/", function(req, res){
    res.render("home", {cp: "n"}); 
});

// ==============
// CHARITY ROUTES
// ==============

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

/*Programmer.create({
    name: "Julio",
    rating: 5
}, function(err, newProgrammer){
    if (err) {
        console.log(err);
    } else { 
       console.log(newProgrammer); 
   }
});*/

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
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("CharityProgrammers running...");
});