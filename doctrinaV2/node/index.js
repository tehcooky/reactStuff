const express = require("express");
const app = express();
const port = 5000;

//S3 stuff
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const DotEnv = require("dotenv");
DotEnv.config();
const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const bucketAccessKey = process.env.AWS_ACCESS_KEY_ID;
const bucketSecret = process.env.AWS_SECRET_KEY_ID;

const s3 = new S3Client({
  credentials: { accessKeyId: bucketAccessKey, secretAccessKey: bucketSecret },
  region: bucketRegion,
});

//const s3 = require("./s3.js");
//import s3 from "./s3.js";

app.use(express.json());

//api
const registrationJourney = require("./api/registrationJourney.js");
const loginJourney = require("./api/loginJourney.js");
const uploadId = require("./api/uploadId.js");
const payment = require("./api/payment.js");
const userUpdate = require("./api/user.js");

//roots
app.get("/", (req, res) => res.send("hello world!"));

//s3 stuff
app.post("/s3", upload.single("file"), async (req, res) => {
  //put this in an api
  const { email } = req.body;
  const filename = req.file.originalname;

  const params = {
    Bucket: bucketName,
    Key: email + "-" + filename,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  const response = JSON.stringify(req.file);
  res.end(response);
});

//registration journey
app.post("/userCreate", async (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });

  const user = ({
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
  } = req.body);

  const response = await registrationJourney.registerUser(user);
  res.end(response);
});

//changeEmail
app.post("/changePassword", async (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  let user = ({ email, password } = req.body);

  const response = await userUpdate.changePassword(user);
  res.end(response);
});

//changeEmail
app.post("/changeEmail", async (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  let user = ({ email, newEmail } = req.body);

  const response = await userUpdate.changeEmail(user);
  res.end(response);
});

//login
app.post("/loginJourney", async (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  let user = ({ email, password } = req.body);

  const response = await loginJourney.login(user);
  res.end(response);
});

//uploadID
app.post("/uploadId", async (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  let idInformation = ({ idFile, email } = req.body);

  const response = await uploadId.uploadId(idInformation);
  res.end(response);
});

//payment
app.post("/payment", async (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  let idInformation = ({ email } = req.body);

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
