// const auth = require("./auth");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
var app = express();
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const registerRoute = require("./routes/register_route");
const futsalRoute = require("./routes/futsal");
const newsRoute = require("./routes/news");
const eventRoute = require("./routes/event");
const imageRoute = require("./routes/images");
const reviewRoute = require("./routes/reviews");
const teamRoute = require("./routes/team");
const teamlistRoute = require("./routes/teamList");



app.use("/uploads", express.static(__dirname + "/uploads/images"));
const uploadRouter = require('./routes/upload_route');

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(morgan("tiny"));
app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
require("./db/database_connection");
app.use(express.json());

//app.use(registerRoute);
app.use("/register", registerRoute);
app.use("/futsal",futsalRoute);
app.use("/events",eventRoute);
app.use("/news",newsRoute);
app.use("/images",imageRoute);
app.use('/upload', uploadRouter);
app.use('/reviews', reviewRoute);
app.use('/team', teamRoute);
app.use('/teamList', teamlistRoute);


// app.use(auth.verifyUser);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({ status: err.message });
});
app.listen(process.env.PORT, () => {
  console.log(`App is running at MongoAtlas:${process.env.PORT}`);
});
