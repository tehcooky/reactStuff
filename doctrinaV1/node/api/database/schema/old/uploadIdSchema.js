const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const uploadId = new Schema({
  id: {
    type: String,
    require: [true, "a user must have an id"],
  },
});
const UploadId = model("usersJourney", uploadId);
module.exports = UploadId;
