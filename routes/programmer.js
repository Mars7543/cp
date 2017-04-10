var express     = require("express");
var router      = express.Router();
var Job         = require("../models/job");
var Programmer  = require("../models/programmer");
var middleware  = require("../middleware");

// =================
// PROGRAMMER ROUTES
// =================

router.get("/programmer/job", middleware.isProgrammer, function(req, res){ // view "my jobs" page
    res.render("programmer/index", {cp: "p", r: "index"}); 
});

// find all available jobs and send the data to the "view all jobs" page
router.get("/programmer/job/all", middleware.isProgrammer, function(req, res){ 
    Job.find({}, function(err, allJobs){
        if (err) {
            console.log(err);
        } else {
            res.render("programmer/all", {cp: "p", r: "view", jobs: allJobs}); 
        }
    });
});

router.get("/programmer/job/:id/", middleware.isProgrammer, function(req, res) { // apply route
    Job.findById(req.params.id, function(err, job){ // find job with the id sent in the url
        if (err) {
            console.log(err);
        } else { 
            job.applicants.push(req.user._id);  // push the programmer's id into the list of applicant IDs and save the job
            job.save();
            res.redirect("/programmer/job");
        }
    });
});

module.exports = router;