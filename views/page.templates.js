"use strict";
const controllers = require("../controllers/controllers");

const START_OF_PAGE = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="style.css" />
    <title>jQuery App</title>
  </head>
  <body>
`;
const END_OF_PAGE = `
<script
      src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
      integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
      integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
      crossorigin="anonymous"
    ></script>
    <script type="text/javascript" src="page.templates.js"></script>
  </body>
</html>
`;

let middlePartOfPage = `email`;
let registrationForm = `
<form action="sign_up" method="POST">
  <h2>Registration new user</h2>
  <p>Email</p>
  <input type="text" required name="email">
  <p>Password</p>
  <input type="password" required minlength=8 name="password">
  <p>Confirm password</p>
  <input type="password" required minlength=8 name="confirmPassword">
  <p>Name</p>
  <input type="text" name="name">
  <p>Age</p>
  <input type="date" name="birthday">
  <p><input type="submit" method="POST" value="Register NOW!">
  </form>
`;

let loginForm = `
<form action="login" method="post">
  <h2>Log in</h2>
  <p>Email</p>
  <input type="text" required name="email">
  <p>Password</p>
  <input type="password" required name="password">
  <p><input type="submit" method="POST" value="Log in">
</form>
`;

exports.template = START_OF_PAGE + middlePartOfPage + END_OF_PAGE;

exports.registration_form = START_OF_PAGE + registrationForm + END_OF_PAGE;
exports.login_form = START_OF_PAGE + loginForm + END_OF_PAGE;

exports.wrong_password =
  START_OF_PAGE +
  registrationForm +
  `<script>alert('Passwords must be the same')</script>` +
  END_OF_PAGE;
