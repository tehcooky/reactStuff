const { json } = require("express");
const User = require("./database/schema/userJourneySchema.js");
const mongoose = require("mongoose");

module.exports = {
  changeEmail: async (userInfo) => {
    var message = "success";

    const { email, newEmail } = userInfo;

    console.log("attempting to find user");

    const DB =
      "mongodb+srv://tehcooky:E6f6ead81f@cluster0.mh4jhqg.mongodb.net/tehcooky?retryWrites=true&w=majority";
    console.log("DB: " + DB);

    const connection = await mongoose.connect(DB);
    if (!connection) {
      console.log("No connection");
      throw new Error("no connection");
    }

    const data = await User.findOne({ email: newEmail })
      .then(() => {
        console.log("data is: " + data);
        message = "email must be unique";
        return JSON.stringify({
          response: `${message}`,
        });
      })
      .catch(async (err) => {
        const data = await User.findOneAndUpdate({
          email: email,
          email: newEmail,
          new: true,
        });
        message = "success";
      })
      .catch((err) => {
        console.log(err);
        message = "email must be unique";
      });

    if (data) {
      const userFetched = JSON.parse(JSON.stringify(data));
    }

    await mongoose.disconnect();

    const response = JSON.stringify({
      response: `${message}`,
    });
    return response;
  },

  changePassword: async (userInfo) => {
    var message = "success";

    const { email, password, newpassword } = userInfo;

    console.log("attempting to find user");

    const DB =
      "mongodb+srv://tehcooky:E6f6ead81f@cluster0.mh4jhqg.mongodb.net/tehcooky?retryWrites=true&w=majority";
    console.log("DB: " + DB);

    const connection = await mongoose.connect(DB);
    if (!connection) {
      console.log("No connection");
      throw new Error("no connection");
    }

    const data = await User.findOneAndUpdate({
      email: email,
      password: password,
      new: true,
    }).catch((err) => {
      console.log(err);
      message = "password not updated";
    });

    await mongoose.disconnect();

    const response = JSON.stringify({
      response: `${message}`,
    });
    return response;
  },
};
