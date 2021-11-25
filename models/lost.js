var mongoose=require("mongoose");

var lostSchema=new mongoose.Schema({
    name:String,
    Owner:String,
    date:String,
    time:String,
    location: String,
    message:String,
    Proof:String,}); 
var lost = mongoose.model("lost",lostSchema);
module.exports =mongoose.model("lost",lostSchema);