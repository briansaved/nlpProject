const dotenv = require("dotenv"); //To allow saving API Credentials
dotenv.config();
let projectData = {}; //App endpoint on server
let path = require("path");
const express = require("express"); //Express server
const mockAPIResponse = require("./mockAPI.js");

const cors = require("cors"); //Cross Origin Resource
const bodyParser = require("body-parser"); //Middleware

const app = express(); //Instance of the App

var aylien = require("aylien_textapi"); //Text API SDK Setup
var textapi = new aylien({
  application_id: process.env.API_ID, //API Credentials saved in .env file
  application_key: process.env.API_KEY,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist")); //Point Server to Output bundled file "Dist"

console.log(__dirname);

//Default Get Route
app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});

// designates what port the app will listen to for incoming requests
let port = process.env.PORT || 8081; //use preset Port if available else use 8081
app.listen(port, function () {
  console.log(`Example app listening on port ${port ? port : 8081}!`);
});

//Test Route to be used later in project
app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

//App Post route for input from Form
app.post("/add", (req, res) => {
  projectData.inputText = req.body.extract; //app endpoint updayes with new data
  res.send(projectData);
});

//API Call Route to SDK
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
