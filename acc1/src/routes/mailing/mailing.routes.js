const express = require("express");
const {sendSMS } = require("../../controllers/mailing/mailing.controller");
const router = express.Router();

router.get("/", sendSMS);

module.exports = router; 
