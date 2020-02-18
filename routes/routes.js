"use strict";
const express = require("express");
const router = express.Router();
const page_templates = require("../views/page.templates");
const controllers = require("../controllers/controllers");

router.get("/", controllers.show_homepage);
router.get("/sign_up", controllers.sign_up_page);
router.post("/sign_up", controllers.register_user);
router.get("/login", controllers.login_page);
router.post("/login", controllers.login_user);

module.exports = router;
