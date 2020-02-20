const User = require("../models/model");

function sendPage(req, res) {
  res.sendFile("/home/user/jQueryApp/views/index.html", err => {
    if (err) return next(err);
  });
}

exports.show_homepage = sendPage;

exports.register_user = async (req, res) => {
  const { email, password, confirmPassword, name, birthday } = req.body;
  const newUser = await User.findOne({ email: email });
  if (newUser)
    res
      .status(409)
      .send(
        `User with email "${email}" is already exists <input type='button' value='Back' onclick='location.href="/sign_up"'>`
      );
  else {
    if (password == confirmPassword) {
      const user = new User({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        name: name,
        birthday: birthday
      });
      try {
        await user.save();
        res
          .status(201)
          .send(
            `New user created <input type='button' value='Home' onclick='location.href="/"'>`
          );
      } catch (e) {
        throw e;
      }
    } else {
      res
        .status(409)
        .send(
          `Passwords must be the same <input type='button' value='Back' onclick='location.href="/sign_up"'>`
        );
    }
  }
};

exports.login_user = async (req, res) => {
  const { email, password } = req.body;
  const loggedUser = await User.findOne({ email: email });
  if (loggedUser) {
    if (loggedUser.password == password) {
      res.cookie("user", email);
      res.cookie("logged_in", true);
      res.status(200).send(`welcome, ${email}`);
    } else res.status(409).send("Wrong password");
  } else {
    res.status(409).send(`User with email "${email}" doesnt exists`);
  }
};

exports.sign_up_page = sendPage;

exports.login_page = sendPage;

exports.user_page = sendPage;
