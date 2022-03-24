const mongoose = require("mongoose");

const postingSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    userName : {
        type:String,
        
    },
    password:{
        type:Number,
    },
    content:{
        type:String,
    },
     postingDate:{
        type:Date,
     },
    
 

});
module.exports = mongoose.model("Postings",postingSchema);