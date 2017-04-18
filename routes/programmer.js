var express     = require("express");
var router      = express.Router();
var User        = require("../models/user");
var Job         = require("../models/job");
var Charity     = require("../models/charity")
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

router.get("/programmer/job/:id/apply", middleware.isProgrammer, function(req, res) { // view more route
    Job.findById(req.params.id, function(err, job){ // find job with the id sent in the url
        if (err) {
            req.flash("error", "true");
            req.flash("internalServerError", 'Something went wrong :( Please try again later');
            res.redirect("/");
        } else { 
            Charity.findOne({name: job.charityName}, function(err, charity){
                if (err) {
                    console.log(err);
                } else {
                    res.render("programmer/view_more", {job: job, charity: charity});
                }
            })
        }
    });
});

router.post("/programmer/job/:id/", middleware.isProgrammer, function(req, res) { // apply route
    User.findOne({"local.email": req.user.local.email}).populate("programmer").exec(function(err, user){
        if (err) {
            req.flash("error", "true");
            req.flash("internalServerError", 'Something went wrong :( Please try again later');
            res.redirect("/");
        } else { 
            Programmer.findById(user.programmer, function(err, programmer) {
                if (err) {
                    req.flash("error", "true");
                    req.flash("internalServerError", 'Something went wrong :( Please try again later');
                    res.redirect("/");
                } else {
                    Job.findById(req.params.id, function(err, job){ // find job with the id sent in the url
                        if (err) {
                            req.flash("error", "true");
                            req.flash("internalServerError", 'Something went wrong :( Please try again later');
                            res.redirect("/");
                        } else { 
                            job.applicants.push(req.user._id);  // push the programmer's id into the list of applicant IDs and save the job
                            job.save();
                            
                            programmer.appliedJobs.push({
                               id: job._id,
                               description: req.body.pDesc
                            });
                            
                            programmer.save();
                            
                            res.redirect("/programmer/job");
                        }
                    }); 
                }
            });
        }
    });
});

router.get("/programmer/test", middleware.isProgrammer, function(req, res) {
   res.render("programmer/view_more"); 
});

module.exports = router;