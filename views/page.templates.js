const cookies = document.cookie.split("; ");
let username = cookies.filter(item => {
  if (item.substring(0, 5) == "user=") return item;
});
let loggedIn;
username = username[0];
if (username) {
  username = username.substring(5);
  if (username) loggedIn = true;
  else loggedIn = false;
}
document.cookie = `logged_in=${loggedIn}`;
$("#home_page").on("click", () => (location.href = "http://localhost:3220/"));

function loginForm() {
  $(document).ready(() => {
    $("body").append(`<form action='/login' method="post"></form>`);
    $("form")
      .append("<h1>Sign in")
      .append(`<p>Email`)
      .append(`<input type='text' required name='email' id='email'>`)
      .append(`<p>Password`)
      .append(`<input type='password' required name='password'>`)
      .append(`<p><input type="submit" value="Log in">`);
  });
}

function registrationForm() {
  $(document).ready(() => {
    $("body").append(`<form action='/sign_up' method="post"></form>`);
    $("form")
      .append(`<h1>Registration`)
      .append(`<p>Email`)
      .append(`<input type='text' required name='email'>`)
      .append(`<p>Password`)
      .append(`<input type='password' required minlength=8 name='password'>`)
      .append(`<p>Confirm password`)
      .append(
        `<input type='password' required minlength=8 name='confirmPassword'>`
      )
      .append(`<p>Name`)
      .append(`<input type='text' name='name'>`)
      .append(`<p>Birthday`)
      .append(`<input type='date' name='birthday'>`)
      .append(`<p><input type="submit" value="Sign up">`);
  });
}

function homePage() {
  $(document).ready(() => {
    $("body")
      .append(`<input type='button' value='Sign up' id='sign'>`)
      .append(`<input type='button' value='Log in' id='login'>`);
    if (loggedIn) {
      $("#login").prop("hidden", true);
      $("#sign").val("Sign out");
    } else {
      $("#login").prop("hidden", false);
      $("#sign").val("Sign up");
    }
    $("#sign").on("click", () => {
      if (loggedIn) {
        //sign out
        document.cookie = "user=";
        document.cookie = "logged_in=false";
        location.reload();
      } else {
        //sign up
        location.href = "http://localhost:3220/sign_up";
      }
    });
    $("#login").on(
      "click",
      () => (location.href = "http://localhost:3220/login")
    );
  });
}

if (location.pathname == "/login") loginForm();
if (location.pathname == "/sign_up") registrationForm();
if (location.pathname == "/") homePage();
