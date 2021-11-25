var middlewareObj = {};
var lost = require("../models/lost"),
    found = require("../models/found")
middlewareObj.isLoggedIn= function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}

middlewareObj.isAdmin= function(req,res,next)
{
	if(req.user.isAdmin == true)
	{
        return next();
	}else{
        res.redirect("/myaccount");
	}
}

module.exports=middlewareObj;