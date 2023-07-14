const express = require("express");
const router = new express.Router();

const {
  validateToTelegram,
  validateToEmail,
} = require("../middlewares/validationDataForm");
const {
  sendToTelegram,
  sendToEmail,
} = require("../models/formDataControllers");

router.post("/telegram", validateToTelegram, sendToTelegram);
router.post("/email", validateToEmail, sendToEmail);

module.exports = router;
