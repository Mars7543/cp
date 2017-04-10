var passport    = require("passport");
var express     = require("express");
var router      = express.Router();

// render homepage
router.get("/", function(req, res){
    res.render("home"); 
});

// ===============
// PASSPORT ROUTES
// ===============

router.post("/signup", passport.authenticate('local-signup', { // signup authentication route
    successRedirect: "/",
    failureRedirect: "/register",
}));

router.get("/register", function(req, res) { // render signup form
   res.render("authentication/register"); 
});

router.get("/login", function(req, res){ // login authentication route
    res.render("authentication/login");
});

router.post("/login", passport.authenticate('local-login', {
    successRedirect : "/",
    failureRedirect : "/login",
    failureFlash    : true
}));

router.get("/logout", function(req, res) { // logout route
    req.logout();
    req.flash("error", "true");
    req.flash("logoutSuccess", "We hope to see you again soon!")
    res.redirect("/");
});

module.exports = router;