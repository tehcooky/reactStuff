const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    require: [true, "a user must have an email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "a user must have a password"],
  },
});
const User = model("tblusers", userSchema);
module.exports = User;
