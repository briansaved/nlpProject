const dotenv = require("dotenv");
dotenv.config();
let path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const aylien = require("aylien_textapi");

const app = express();

var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("dist/index.html"));
});

// designates what port the app will listen to for incoming requests
let port = process.env.PORT || 8081;
app.listen(port, function () {
  console.log(`Example app listening on port ${port ? port : 8081}!`);
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
