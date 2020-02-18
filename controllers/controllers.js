const User = require("../models/model");
const page_template = require("../views/page.templates");

exports.show_homepage = (req, res) => {
  res.send("homepage");
};

exports.register_user = (req, res) => {
  function findSameEmail(item) {
    return item.email == req.body.email;
  }
  User.find((err, user) => {
    if (err) return next(err);
    if (user.some(findSameEmail))
      res.send("User with that email is already exists");
    else {
      let user = new User({
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        name: req.body.name,
        age: req.body.age
      });
      if (user.password != user.confirmPassword)
        res.send(page_template.wrong_password);
      else
        user.save(err => {
          if (err) return next(err);
          res.send("new user successfully registered");
        });
    }
  });
};

exports.login_user = (req, res) => {
  User.findOne(
    { email: req.body.email, password: req.body.password },
    (err, user) => {
      if (err) return next(err);
      if (user) res.send("welcome, " + user.email);
      else res.send("user with email " + req.body.email + " doesnt exists");
    }
  );
};

exports.sign_up_page = (req, res) => {
  res.send(page_template.registration_form);
};

exports.login_page = (req, res) => {
  res.send(page_template.login_form);
};
