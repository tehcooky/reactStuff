const { json } = require("express");

module.exports = {
  login: async (userInfo) => {
    const User = require("./database/schema/userJourneySchema.js");
    const mongoose = require("mongoose");

    var message = "";

    const { email, password } = userInfo;

    console.log("attempting to find user");

    const DB =
      "mongodb+srv://tehcooky:E6f6ead81f@cluster0.mh4jhqg.mongodb.net/tehcooky?retryWrites=true&w=majority";
    console.log("DB: " + DB);

    const connection = await mongoose.connect(DB);
    if (!connection) {
      console.log("No connection");
      throw new Error("no connection");
    }

    const data = await User.findOne({ email: email }).catch((err) => {
      console.log(err);
    });

    const userFetched = JSON.parse(JSON.stringify(data));

    if (
      userFetched !== null &&
      userFetched["password"] !== null &&
      userFetched["password"] === password
    ) {
      message = "success!";
    } else {
      message = "username or password is incorrect";
    }

    await mongoose.disconnect();

    const registrationStage = userFetched["registrationStage"];

    const response = JSON.stringify({
      response: `${message}`,
      email: `${email}`,
      registrationStage: `${registrationStage}`,
    });
    return response;
  },
};
