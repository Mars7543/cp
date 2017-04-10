var express     = require("express");
var router      = express.Router();
var Job         = require("../models/job");
var User        = require("../models/user");
var middleware  = require("../middleware");

// ==============
// CHARITY ROUTES
// ==============

router.get("/charity/job", middleware.isCharity, function(req, res){ // view "my jobs" route
    User.findOne({"local.email" : req.user.local.email}).populate("charity").exec(function(err, user){ // populate the user's charity schema
        if (err) {
            req.flash("error", "true");
            req.flash("internalServerError", 'Something went wrong :( Please try again later');
            res.redirect("/");
        } else {
            // find job(s) that share the same charity name as the one in the user's charity schema
            Job.findOne({charityName : user.charity.name}).populate({path: "applicants", populate: {path: "programmer"}}).exec(function(err, job){
                if (err) {
                    req.flash("error", "true");
                    req.flash("internalServerError", 'Something went wrong :( Please try again later');
                    
                    res.redirect("/");
                } else {
                    res.render("charity/index", {cp: "c", r: "index", job: job});
                }
            });
        }
    });
});

router.get("/charity/job/new", middleware.isCharity, function(req, res){ // render create job form
   res.render("charity/new", {cp: "c", r: "new"}); 
});

router.post("/charity/job", middleware.isCharity, function(req, res){ // create job route
    User.findOne({"local.email" : req.user.local.email}).populate("charity").exec(function(err, user){ // populate user's charity schema
        if (err) {
            req.flash("error", "true");
            req.flash("internalServerError", 'Something went wrong :( Please try again later');
            
            res.redirect("/");
        } else {
            Job.create(req.body.job, function(err, newJob){ // create the job
                if (err){
                    req.flash("error", "true");
                    req.flash("internalServerError", 'Something went wrong :( Please try again later');
                    
                    res.redirect("/");
                } else { // push the user's charity name into the newly created job and save it
                    newJob.charityName = user.charity.name;
                    newJob.save();
                    
                    res.redirect("/charity/job");
                }
            });
        }
    });
});

module.exports = router;