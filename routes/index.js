var passport    = require("passport");
var express     = require("express");
var router      = express.Router();

router.get("/", function(req, res){
    res.render("home", {cp: "n"}); 
});

// ===============
// PASSPORT ROUTES
// ===============

router.post("/signup", passport.authenticate('local-signup', {
    successRedirect: "/",
    failureRedirect: "/register",
}));

router.get("/register", function(req, res) {
   res.render("authentication/register"); 
});

router.get("/login", function(req, res){
    res.render("authentication/login");
});

router.post("/login", passport.authenticate('local-login', {
    successRedirect : "/",
    failureRedirect : "/login",
    failureFlash    : true
}));

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("error", "true");
    req.flash("logoutSuccess", "We hope to see you again soon!")
    res.redirect("/");
});

module.exports = router;