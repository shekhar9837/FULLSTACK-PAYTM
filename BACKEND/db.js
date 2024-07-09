const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://mauryashekhar848:3p6XgFvxH7CmDTvX@paytm.md2wlao.mongodb.net/");

const userSchema = new mongoose.Schema({
    username:{
        username:String,
        require:true,
        unique:true,
        minLength:3,
        maxLength:36
    },
    password:{
        type:String,
        require:true,
        minLength:6
    },
    firstName:{
        require:true,
        type:String,
        maxlength:30
    },
      lastName:{
        require:true,
        type:String,
        maxlength:30
    }

})

const User =  mongoose.Model("User", userSchema);

exports.modules={
    User
}