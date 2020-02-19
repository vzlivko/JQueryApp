const User = require("../models/model");

function sendPage(req, res) {
  res.sendFile("/home/user/jQueryApp/views/index.html", err => {
    if (err) return next(err);
  });
}

exports.show_homepage = sendPage;

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
        birthday: req.body.birthday
      });
      if (user.password != user.confirmPassword) res.send("wrong password");
      else
        user.save(err => {
          if (err) return next(err);
          res.send("new user successfully registered");
        });
    }
  });
};

exports.login_user = (req, res) => {
  let str;
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return next(err);
    if (!user) str = `user with email ${req.body.email} doesnt exists`;
    else {
      if (user.password == req.body.password) str = `welcome, ${user.email}`;
      else str = `wrong password`;
    }
    res.send(str);
  });
};

exports.sign_up_page = sendPage;

exports.login_page = sendPage;

exports.user_page = sendPage;
