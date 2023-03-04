const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    require: [true, "a user must have a username"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "a user must have a password"],
  },
});
const User = model("users", userSchema);
module.exports = User;
