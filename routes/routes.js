"use strict";
const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

router.get("/", controllers.show_homepage);
router
  .route("/sign_up")
  .get(controllers.sign_up_page)
  .post(controllers.register_user);
router
  .route("/login")
  .get(controllers.login_page)
  .post(controllers.login_user);

module.exports = router;
