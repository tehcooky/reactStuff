const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

//api
const registrationJourney = require("./api/registrationJourney.js");
const loginJourney = require("./api/loginJourney.js");
const uploadId = require("./api/uploadId.js");
const payment = require("./api/payment.js");

//roots
app.get("/", (req, res) => res.send("hello world!"));

//registration journey
app.post("/registrationStage1", async (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  let user = {
    email: req.body.email,
    password: req.body.password,
    firstLineAddress: req.body.firstLineAddress,
    secondLineAddress: req.body.secondLineAddress
      ? req.body.secondLineAddress
      : "",
    county: req.body.county,
    postcode: req.body.postcode,
    country: req.body.country,
    newsletterOptIn: req.body.newsletterOptIn,
    agreeToTerms: req.body.agreeToTerms,
    registrationStage: req.body.registrationStage,
    id: req.body.id,
    paidTandD: req.body.paidTandD,
  };

  const response = await registrationJourney.registerUser(user);
  res.end(response);
});

//login
app.post("/loginJourney", async (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  let user = {
    email: req.body.email, // get this from req
    password: req.body.password,
  };

  const response = await loginJourney.login(user);
  res.end(response);
});

//uploadID
app.post("/uploadId", async (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  let idInformation = {
    idFile: req.body.id,
    email: req.body.email,
  };

  const response = await uploadId.uploadId(idInformation);
  res.end(response);
});

//payment
app.post("/payment", async (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  let idInformation = {
    email: req.body.email,
  };

  const response = await payment.makePayment(idInformation);
  res.end(response);
});

app.listen(port, () => console.log(`App is listening on port ${port}!`));

//old api
// const registerUser = require("./api/registerUser.js");
// const loginUser = require("./api/login.js");

// //basic register
// app.post("/register", async (req, res) => {
//   res.writeHead(200, { "Content-type": "application/json" });

//   username = req.body.username; // get this from req
//   password = req.body.password;

//   const response = await registerUser.registerUser(username, password);
//   res.end(response);
// });

//basic login(username, password)
// app.post("/login", async (req, res) => {
//   res.writeHead(200, { "Content-type": "application/json" });

//   username = req.body.username; // get this from req
//   password = req.body.password;

//   const response = await loginUser.login(username, password);
//   res.end(response);
// });
