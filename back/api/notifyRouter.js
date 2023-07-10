const express = require("express");
const router = new express.Router();

const { validateDataForm } = require("../middlewares/validationDataForm");
const {
  sendToTelegram,
  sendToEmail,
} = require("../models/formDataControllers");

router.post("/telegram", validateDataForm, sendToTelegram);
router.post("/email", sendToEmail);

module.exports = router;
