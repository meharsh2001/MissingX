var express=require("express");
const { isAdmin } = require("../middleware/middleware.js");
const claim = require("../models/claim.js");

var router=express.Router();
lost    =require("../models/lost.js"),
found   =require("../models/found.js"),
alluser            =require("../models/user.js"),
middleware = require("../middleware/middleware.js");
const feedback = require("../models/feedback.js");
const search = require("../models/search.js");
a    =require("../models/user.js"),



//HOME
router.get("/",function(req,res)
{
    res.render("home");
});

//admin
router.get("/admin", middleware.isLoggedIn, middleware.isAdmin,function(req,res)
{     
        alluser.find({},function(err,alluser){
        res.render("admin",{alluserlist: alluser})});
});


//tour
router.get("/tour",function(req,res)
{
    res.render("tour");
});


//MAPW
router.get("/map",function(req,res)
{
    res.render("landing");
});

//CONTACTUS
router.get("/contactus", middleware.isLoggedIn,function(req,res)
{
    res.render("contact");
});

// THANKS
router.get("/thanks",function(req,res)
{
    res.render("reqsend");
});

//LOST ITEM LIST
router.get("/lostitemlist", middleware.isLoggedIn,function(req,res)
{
    lost.find({},function(err,lost){
    res.render("lostitemlist",{lostslist: lost})});
});

//FOUNDITEMLIST
router.get("/founditemlist", middleware.isLoggedIn,function(req,res)
{
    found.find({},function(err,found){
    res.render("founditemlist",{foundslist: found})});
});

//FEEDBACKLIST
router.get("/feedbacktable", middleware.isLoggedIn,function(req,res)
{
    feedback.find({},function(err,feedback){
    res.render("feedbacktable",{feedbacktable: feedback})});
});

//LOSTFORM
router.get("/lostform", middleware.isLoggedIn,function(req,res)
{
    res.render("lost");
});

//FOUNDFORM
router.get("/foundform", middleware.isLoggedIn,function(req,res)
{
    res.render("found");
});

//ITEMS
router.get("/items",function(req,res)
{
    res.render("items");
});

//FEEDBACK
router.get("/contactus/feedback", middleware.isLoggedIn,function(req,res)
{
    res.render("feedback");
});

//us
router.get("/us", middleware.isLoggedIn,function(req,res)
{
    res.render("us");
});

//me
router.get("/me", middleware.isLoggedIn,function(req,res)
{
    res.render("me");
});

//feedbacktable
router.get("/feedbacktable", middleware.isLoggedIn,function(req,res)
{
    res.render("feedbacktable");
});


//MYACCOUNT    
router.get("/myaccount", middleware.isLoggedIn,function(req,res)
{
    console.log(req.user.id);
    res.render("myaccount");
});

//DEL USER    
router.get("/myaccount/deleteuser/id86594949684511491494694549648", middleware.isLoggedIn,function(req,res)
{
    console.log(req.user.id);
    a.findByIdAndRemove(req.user.id,(err) => {
        if(err)
        {
            console.log("error","Following error encountered : " +err);
       
        }
        else{
          console.log("<==ID","Success! User Deleted");
          
        } });
        res.redirect("/thanks");

});

//LOGINFAILED
router.get("/loginfailed",function(req,res)
{
    res.render("loginfailed");
});
//REGISTERFAILED
router.get("/registerfailed",function(req,res)
{
    res.render("registerfailed");
});

//CLAIM
router.get("/claim", middleware.isLoggedIn,function(req,res)
{
    lost.find({},function(err,lost){
        res.render("claim",{lostslist: lost})});
});

//REgISTER
router.get("/register",function(req,res)
{
    res.render("register");
});

// login
router.get("/login",function(req,res)
{
    res.render("login");
});


//signout
router.get("/logout",function(req,res)
{
    req.logout();
    res.redirect("/thanks");
});

module.exports = router;



// login
router.get("*",function(req,res)
{
    res.render("404");
});
