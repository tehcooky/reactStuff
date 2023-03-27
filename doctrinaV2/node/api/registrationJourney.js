module.exports = {
  registerUser: async (userInfo) => {
    const User = require("./database/schema/userJourneySchema.js");
    const mongoose = require("mongoose");

    const {
      email,
      password,
      firstLineAddress,
      secondLineAddress,
      postcode,
      county,
      country,
      newsletterOptIn,
      agreeToTerms,
      registrationStage,
      id,
      paidTandD,
      admin,
    } = userInfo;

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

    //decode json and put into schema
    const user = new User({
      email,
      password,
      firstLineAddress,
      secondLineAddress,
      county,
      postcode,
      country,
      newsletterOptIn,
      agreeToTerms,
      registrationStage,
      id,
      paidTandD,
      admin,
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
    const response = JSON.stringify({
      response: `${message}`,
      email: `${email}`,
    });

    return response;
  },
};
