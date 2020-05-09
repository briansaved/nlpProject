const dotenv = require("dotenv");
dotenv.config();
let projectData = {};
let path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

var aylien = require("aylien_textapi");
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  // res.sendFile(path.resolve("./src/client/views/index.html"));
  res.sendFile(path.resolve("dist/index.html"));
});

// designates what port the app will listen to for incoming requests
let port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Example app listening on port ${port ? port : 8081}!`);
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/add", (req, res) => {
  projectData.inputText = req.body.extract;
  res.send(projectData);
});

app.get("/sentiment", (req, res) => {
  textapi.sentiment(
    {
      text: projectData.inputText,
      mode: "tweet",
    },
    function (error, response) {
      if (error === null) {
        res.send(response);
      }
    }
  );
});
