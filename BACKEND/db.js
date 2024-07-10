const mongoose = require("mongoose")
const mongoURL = process.env.MONGODB_URL

mongoose.connect(mongoURL);

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

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }, 
    balance:{
        type:Number,
        required:true,
    }
})

const User =  mongoose.Model("User", userSchema);
const Account = mongoose.Model("Account", accountSchema);
module.exports={
    User,
    Account
}