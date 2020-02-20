"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let task = new Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
  checked: { type: Boolean, required: true }
});

let user = new Schema({
  email: { type: String, required: true, max: 50 },
  password: { type: String, required: true, max: 50, min: 8 },
  confirmPassword: { type: String, required: true, max: 50, min: 8 },
  name: { type: String, max: 30 },
  birthday: Date,
  toDoList: new Schema({
    name: String,
    task: [task]
  })
});

module.exports = mongoose.model("User", user);
