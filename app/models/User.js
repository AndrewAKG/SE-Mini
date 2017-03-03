var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var URLsSchema = mongoose.Schema({
    title : String ,
    link : String
})

var ShotsSchema = mongoose.Schema({
    title:String,
    Pic :String
})

var UserSchema = mongoose.Schema({
    FirstName:{
        type:String,
        required:true, 
    },
    LastName:{
        type:String,
        required:true
    },
    UserName:{
        type:String,
        required:true,
        unique:true

    },
    PassWord:{
    type :String,
    required:true
    },  
    Image :{
    type:String
},
    Links: [URLsSchema]
    ,  
    ScreenShots :[ShotsSchema]
})
UserSchema.plugin(mongoosePaginate);

var User = mongoose.model("user", UserSchema);

module.exports = User;