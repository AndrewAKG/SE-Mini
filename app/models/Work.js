var mongoose = require('mongoose');

var URLsSchema = mongoose.Schema({
    title : String ,
    link : String
})

var ShotsSchema = mongoose.Schema({
    title:String,
    Pic :String
})

var workSchema = mongoose.Schema({
    UserName:{
        type:String,
        required:true,
        unique:true

    },
    Links: [URLsSchema]
    ,  
    ScreenShots :[ShotsSchema]
});

var Work = mongoose.model("work", workSchema);

module.exports = Work;