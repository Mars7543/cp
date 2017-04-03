var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();

// MONGOOSE CONFIG
mongoose.connect("mongodb://localhost/charity_programmers");

// JOB MODEL
var Job = mongoose.model("Job", new mongoose.Schema({
    title: String,
    description: String,
    charityName: String,
    applicants: [String], 
    status: {type: Number, default: 1}
}));

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("home", {cp: "n"}); 
});

// ==============
// CHARITY ROUTES
// ==============

app.get("/charity/job", function(req, res){
   res.render("charity/index", {cp: "c", r: "index"}); 
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
            res.render("programmer/all", {cp: "p", r: "index", jobs: allJobs}); 
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("CharityProgrammers running...");
});