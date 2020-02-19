const cookies = document.cookie.split(";");
function loginForm() {
  $(document).ready(() => {
    $("body").append(`<form action='/login' method="post"></form>`);
    $("form")
      .append("<h1>Sign in</h1>")
      .append(`<p>Email`)
      .append(`<input type='text' required name='email' id='email'>`)
      .append(`<p>Password`)
      .append(`<input type='password' required name='password'>`)
      .append(`<p><input type="submit" value="Log in">`)
      .append(`<input type='button' id='go_home' value='go to home page'>`);
    $("#go_home").on("click", () => (location.href = "http://localhost:3220/"));
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
      .append(`<p><input type="submit" value="Sign up">`)
      .append(`<input type='button' id='go_home' value='go to home page'>`);
    $("#go_home").on("click", () => (location.href = "http://localhost:3220/"));
  });
}

function homePage() {
  $(document).ready(() => {
    $("body")
      .append(`<input type='button' value='Sign up' id='sign_up'>`)
      .append(`<input type='button' value='Log in' id='login'>`);
    $("#sign_up").on(
      "click",
      () => (location.href = "http://localhost:3220/sign_up")
    );
    $("#login").on(
      "click",
      () => (location.href = "http://localhost:3220/login")
    );
  });
}

function userHomePage() {
  $(document).ready(() => {
    $("body").append(`<h3>Welcome, ${document.cookie}</h3>`);
  });
}

if (location.pathname == "/login") loginForm();
if (location.pathname == "/sign_up") registrationForm();
if (location.pathname == "/") homePage();
if (location.pathname == "/users") userHomePage();
