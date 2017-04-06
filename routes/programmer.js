var express     = require("express");
var router      = express.Router();
var Job         = require("../models/job");
var Programmer  = require("../models/programmer");
var middleware  = require("../middleware");

// =================
// PROGRAMMER ROUTES
// =================

router.get("/programmer/job", function(req, res){
    res.render("programmer/index", {cp: "p", r: "index"}); 
});

router.get("/programmer/job/all", function(req, res){
    Job.find({}, function(err, allJobs){
        if (err) {
            console.log(err);
        } else {
            res.render("programmer/all", {cp: "p", r: "view", jobs: allJobs}); 
        }
    });
});

router.get("/programmer/job/:id/", function(req, res) {
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

module.exports = router;