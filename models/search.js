var mongoose=require("mongoose");

var searchSchema=new mongoose.Schema({
    name:String,
    item:String}); 
var search = mongoose.model("search",searchSchema);
module.exports =mongoose.model("search",searchSchema);