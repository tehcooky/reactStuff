const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    require: [true, "a user must have a username"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "a user must have a password"],
  },
  firstLineAddress: {
    type: String,
    require: [true, "a user must have a first line in their address"],
  },
  secondLineAddress: {
    type: String,
  },
  county: { type: String, require: [true, "a user must have a county"] },
  postcode: { type: String, require: [true, "a user must have a post code"] },
  country: { type: String, require: [true, "a user must have a country"] },
  newsletterOptIn: { type: Boolean },
  agreeToTerms: {
    type: Boolean,
    require: [true, "a user must agree to terms"],
  },
  registrationStage: {
    type: Number,
    require: [true, "a user must be on a stage of the journey"],
  },
  id: { type: String, require: [true, "user must be created with this ID"] },
  paidTandD: {
    type: String,
    require: [true, "user must be created with paid set to 0"],
  },
  admin: {
    type: Boolean,
  },
});
const User = model("tbluser", userSchema);
module.exports = User;
