const mongoose = require("mongoose");
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    minLength: 3,
    maxLength: 36,
  },
  password: {
    type: String,
    require: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    require: true,
    maxlength: 30,
  },
  lastName: {
    type: String,
    require: true,
    maxlength: 30,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);
module.exports = {
  User,
  Account,
};
