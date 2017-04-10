var middleware = {};

// check if the user is affliated with a charity and redirect them accordingly
middleware.isCharity = function isCharity (req, res, next){
    if (req.isAuthenticated()){ // check if they are logged in first
        if (req.user.organization === "charity")
            return next();
        else {
            req.flash("error", "true");
            req.flash("permissionsError", "You need to be affiliated with a charity to go there!");
            
            res.redirect("/");
        }
    } else {
        req.flash("error", "true");
        req.flash("permissionsError", "You need to be logged in to go there!");
        
        res.redirect("/login");
    }
}

// check if the user is a programmer and redirect them accordingly
middleware.isProgrammer = function isProgrammer (req, res, next){
    if (req.isAuthenticated()){ // check if they are logged in first
        if (req.user.organization === "programmer")
            return next();
        else {
            req.flash("error", "true");
            req.flash("permissionsError", "You need to be a programmer to go there!");
            
            res.redirect("/");
        }
    } else {
        req.flash("error", "true");
        req.flash("permissionsError", "You need to be logged in to go there!");
        
        res.redirect("/login");
    }
}

module.exports = middleware;