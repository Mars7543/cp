var express     = require("express");
var router      = express.Router();
var Job         = require("../models/job");
var User        = require("../models/user");
var middleware  = require("../middleware");

// ==============
// CHARITY ROUTES
// ==============

router.get("/charity/job", middleware.isLoggedIn, function(req, res){
    User.findOne({"local.email" : req.user.local.email}).populate("charity").exec(function(err, user){
        if (err) {
            req.flash("error", "true");
            req.flash("internalServerError", 'Something went wrong :( Please try again later');
            res.redirect("/");
        } else {
            Job.findOne({charityName : user.charity.name}).populate({path: "applicants", populate: {path: "programmer"}}).exec(function(err, job){
                console.log(job.applicants[0]);
                
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

router.get("/charity/job/new", middleware.isLoggedIn, function(req, res){
   res.render("charity/new", {cp: "c", r: "new"}); 
});

router.post("/charity/job", middleware.isLoggedIn, function(req, res){
    User.findOne({"local.email" : req.user.local.email}).populate("charity").exec(function(err, user){
        if (err) {
            req.flash("error", "true");
            req.flash("internalServerError", 'Something went wrong :( Please try again later');
            
            res.redirect("/");
        } else {
            Job.create(req.body.job, function(err, newJob){
                if (err){
                    req.flash("error", "true");
                    req.flash("internalServerError", 'Something went wrong :( Please try again later');
                    
                    res.redirect("/");
                } else {
                    newJob.charityName = user.charity.name;
                    newJob.save();
                    
                    res.redirect("/charity/job");
                }
            });
        }
    });
});

module.exports = router;