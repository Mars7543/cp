var express     = require("express");
var router      = express.Router();
var Job         = require("../models/job.js");
var middleware  = require("../middleware");

// ==============
// CHARITY ROUTES
// ==============

router.get("/charity/job", function(req, res){
    Job.findOne({}).populate("routerlicants").exec(function(err, foundJob){
        if (err) {
            console.log(err);
        }  else {
            res.render("charity/index", {cp: "c", r: "index", routerlicants: foundJob.routerlicants}); 
        }
    })
});

router.get("/charity/job/new", function(req, res){
   res.render("charity/new", {cp: "c", r: "new"}); 
});

router.post("/charity/job", function(req, res){
    Job.create(req.body.job, function(err, newJob){
        if (err){
            console.log(err);
        } else {
            res.redirect("/charity/job");
        }
    });
});

module.exports = router;