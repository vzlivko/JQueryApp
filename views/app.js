"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const body_parser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const routes = require("../routes/routes");
const dev_db_url =
  "mongodb+srv://admin:admin322@cluster0-yy1sj.mongodb.net/test?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
const port = 3220;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use("/", routes);
app.use("/pages", express.static("."));
app.use(cookieParser());

app.listen(port, () => {
  console.log("Server on port " + port);
});
