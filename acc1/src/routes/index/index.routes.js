const express = require("express");
const { home } = require("../../controllers/auth/auth.controller");
const router = express.Router();

router.get("/", home);

module.exports = router