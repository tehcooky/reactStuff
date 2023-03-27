module.exports = {
  registerUser: async (username, password) => {
    const User = require("./database/schema/userSchema.js");
    const mongoose = require("mongoose");

    var message = "";

    console.log("attempting to register user");

    const DB =
      "mongodb+srv://tehcooky:E6f6ead81f@cluster0.mh4jhqg.mongodb.net/tehcooky?retryWrites=true&w=majority";
    console.log("DB: " + DB);

    const connection = await mongoose.connect(DB);
    if (!connection) {
      console.log("No connection");
      throw new Error("no connection");
    }
    const user = new User({
      username,
      password,
    });
    const data = await user.save().catch((err) => {
      console.log(err);
    });

    await mongoose.disconnect();

    if (data !== undefined) {
      message = "success";
    } else {
      message = "error - user already exists";
    }

    //var response = [(message) => "wow", (user) => "wow", (password) => "wow"];
    const response = `response: ${message}, user: ${username}`;
    return response;
  },
};
