var middleware = {};

middleware.isLoggedIn = function isLoggedIn (req, res, next){
    if (req.isAuthenticated())
        return next();
        
    req.flash("error", "true");
    req.flash("permissionsError", "You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middleware;