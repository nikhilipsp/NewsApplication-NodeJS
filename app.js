var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var routes = require("./routes");

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use("/createProfile", express.static("./tmp/"));
app.use("/newsFeed", express.static("./tmp/"));

app.use("/", routes);

module.exports = app;
