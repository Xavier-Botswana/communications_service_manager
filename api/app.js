require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const https = require("https");

/*
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};


app.use(allowCrossDomain);
*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/sms", (req, res) => {
  let username = "xavier_africa";
  let password = "@Xav!er123";

  let postData = JSON.stringify({
    to: req.body.to,
    body: req.body.body,
  });

  let options = {
    hostname: "api.bulksms.com",
    port: 443,
    path: "/v1/messages",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": postData.length,
      Authorization:
        "Basic " + Buffer.from(username + ":" + password).toString("base64"),
    },
  };

  req = https.request(options, (resp) => {
    console.log("statusCode:", resp.statusCode);
    let data = "";
    resp.on("data", (chunk) => {
      data += chunk;
    });
    resp.on("end", () => {
      console.log("Response:", data);
    });
  });

  req.on("error", (e) => {
    console.error(e);
  });

  req.write(postData);
  req.end();
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
