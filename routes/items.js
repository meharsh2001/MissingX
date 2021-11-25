var express=require("express");
var searchinput;
var searchoutput;
var router=express.Router();
a    =require("../models/user.js"),
lost    =require("../models/lost.js"),
found   =require("../models/found.js"),
alluser            =require("../models/user.js"),
claim            =require("../models/claim.js"),
middleware = require("../middleware/middleware.js");
const feedback = require("../models/feedback.js");
const search = require("../models/search.js");
const http = require("http");
const fs = require("fs");
var requests = require("requests");

//LOSTFORM
router.post("/lostform",function(req,res) { 
  const newlost=new lost({ 
    name:req.body.name,
      Owner:req.body.Owner,
      date:req.body.date,
      time:req.body.time,
      location:req.body.location,
      message:req.body.message,
      Proof:req.body.Proof,
});
        console.log(req.user);
             newlost.save();
              res.redirect("/thanks");
  });

//foundform
router.post("/foundform",function(req,res) { 
  const newfound=new found({ 
    item:req.body.item,
    name:req.body.name,
     location:req.body.location,
    specifications:req.body.specifications,
    care:req.body.gender,
    submit:req.body.gender,});
             newfound.save();
              res.redirect("/thanks");
  });
//feedback
router.post("/contactus/feedback",function(req,res) { 
  const newfeedback=new feedback({ 
             name:req.body.name,
             username:req.body.username,
             message:req.body.message, });
             newfeedback.save();
             res.redirect("/contactus");
  });

//lostserchbar
router.get("/lostsearchbar",function(req,res)
{     
   search.findOne({searchinput},function(err) {
     if(err){
     console.log("data point 2 no entry found"+err);
     res.redirect("/lostitemlist");
      } else {
        lost.findOne({name: searchinput},function(err,data) {
          if(err){
          console.log("data point 4 no entry found"+err);
          res.redirect("/lostitemlist");
           } else { 
//            var orgdata = JSON.stringify(data);
//            console.log("data 5:"+orgdata);  
            res.status(200).json(data);
 //           console.log("data 6:"+orgdata[20]);  
 //          const search=new search({ 
 //           name:req.body.name,
 //           username:req.body.username,
 //           message:req.body.message, });     
//
            }     });      console.log("Lost Ended");     }       });      });
  
//lostsearchpost
router.post("/lostitemlist",function(req,res) { 
  var user_id = '61900e9939d98a054c04b1ea';
  search.findByIdAndUpdate(user_id,{name:req.body.name}, function(err, data) {
if(err){
console.log("failed to update For atlas"+err);
} else {console.log("updated For atlas"); }
});   //  const newsearch=new search({name:req.body.name});
             searchinput =req.body.name;
             //newsearch.save();
             res.redirect("/lostsearchbar");
  });  
 
 //foundsearchpost
router.post("/founditemlist",function(req,res) { 
  var user_id = '619077365d80a7ea38de0b17';
  search.findByIdAndUpdate(user_id,{item:req.body.item}, function(err, data) {
if(err){
console.log("failed to update For atlas"+err);
} else {console.log("updated For atlas"); }
});   //  const newsearch=new search({item:req.body.item});
             searchoutput =req.body.item;
             //newsearch.save();
            //console.log(searchoutput);
             res.redirect("/foundsearchbar");
  });  
  
//foundserchbar
router.get("/foundsearchbar",function(req,res)
{     
   search.findOne({searchoutput},function(err) {
     if(err){
     console.log("data point 2 no entry found"+err);
     res.redirect("/founditemlist");
      } else {
       // console.log(searchoutput);
        found.findOne({item: searchoutput},function(err,data) {
          if(err){
          console.log("data point 4 no entry found"+err);
          res.redirect("/founditemlist");
           } else { 
//            var orgdata = JSON.stringify(data);
//            console.log("data 5:"+orgdata);  
            res.status(200).json(data);
 //           console.log("data 6:"+orgdata[20]);  
 //          const search=new search({ 
 //           name:req.body.name,
 //           username:req.body.username,
 //           message:req.body.message, });     
//
            }     });      console.log("Found Ended");     }       });      });


// REGISTER
router.post("/register",function(req,res)
{ 
  var newUser=new User({      firstname:req.body.firstname,
                              lastname:req.body.lastname,
                              number:req.body.number,
                              dob:req.body.dob,
                              gender:req.body.gender,
                              username:req.body.username    });
                              console.log(req.body.firstname);
  console.log(req.body.password);
  User.register(newUser,req.body.password,function(err,user){
      if(err)
      {
          console.log("In items.js, unable to register user");
          console.log(err);
          res.redirect("back")
      }
      else{
          passport.authenticate("local")(req,res,function()
          {
              console.log("successfully registered user",req.user);
              res.locals.currentUser=req.user;
              res.redirect("/tour");
          });
      }
  });
});
 
//myaccount
router.post("/myaccount",function(req,res)
{ console.log(req.user.id);
  a.findOneAndUpdate({username: req.user.username},{dob:req.body.dob, 
                                                    fistname:req.body.firstname,
                                                    lastname:req.body.lastname, 
                                                    number:req.body.number, 
                                                    gender:req.body.gender}, function(err, data) {
    if(err){
              console.log("failed to update data"+err);
              res.redirect("/");
            } else {
              console.log(req.user.username+": user updated data :"+data);
              res.redirect("/tour"); }
            });
});

//LOGIN
router.post("/login",passport.authenticate('local',{
  successRedirect:'/tour',
  failureRedirect:"/loginfailed"
}
)
);

//claim
router.post("/claim",function(req,res) { 
  const newclaim=new claim({ 
    name:req.body.name,
    username:req.user.username,
    founder:req.body.founder,
    date:req.body.date,
    location:req.body.location,
    verify:req.body.verify});
    console.log(req.user.username);
             newclaim.save();
              res.redirect("/thanks");
  });

  //REQUEST STATUS
router.get("/contactus/reportstatus", middleware.isLoggedIn,function(req,res)
{
    var availableuser = req.user.username;
    console.log(availableuser);
    claim.find({availableuser},function(err){
      if(err){
        console.log("data point 2 no entry found"+err);
        //console.log("data 1:"+data);
        res.redirect("/contactus");
         } else {
        claim.findOne({username: availableuser},function(err,data) {
          if(err){
          console.log("data point 4 no entry found"+err);
          //console.log("data 2:"+data);
          res.redirect("/contactus");
           } else { if (data == null){
             res.status(200).json(data);}else{
             // console.log("data 3:"+data);
           //  res.status(200).json(data);
            claim.find({},function(err,claim){
              res.render("reportstatus",{claimslist: claim})});
              //console.log("data f:"+data); 
            }

            router.get("/contactus/reportstatus/api",middleware.isLoggedIn,function(req,res)
            {
                res.status(200).json(data);});

            ;}});}
    
    });
    
});
module.exports = router;