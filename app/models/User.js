var mongoose = require('mongoose');

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
    data:Buffer,
    contenttype:String
    }
})

var User = mongoose.model("user", UserSchema);

module.exports = User;