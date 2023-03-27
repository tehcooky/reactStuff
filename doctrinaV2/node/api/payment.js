const { json } = require("express");

module.exports = {
  makePayment: async (idInformation) => {
    const User = require("./database/schema/userJourneySchema.js");
    const mongoose = require("mongoose");

    var message = "success";

    const { email } = idInformation;

    console.log("attempting to find user");

    const DB =
      "mongodb+srv://tehcooky:E6f6ead81f@cluster0.mh4jhqg.mongodb.net/tehcooky?retryWrites=true&w=majority";
    console.log("DB: " + DB);

    const connection = await mongoose.connect(DB);
    if (!connection) {
      console.log("No connection");
      throw new Error("no connection");
    }

    const data = await User.updateOne(
      { email: email },
      {
        registrationStage: 4,
      }
    ).catch((err) => {
      console.log(err);
      message = err;
    });

    await mongoose.disconnect();

    const response = JSON.stringify({
      response: `${message}`,
    });
    return response;
  },
};
