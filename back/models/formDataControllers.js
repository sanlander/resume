const axios = require("axios");
const sendEmail = require("../service/email/email");

const sendToTelegram = async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    const message = `✅ <b>RESUME:</b>

👨‍💼  Ім'я: ${name}
📧  Email: ${email}
📞  Телефон: +38${phone}`;

    const URL = `https://api.telegram.org/${process.env.TG_API_BOT}/sendMessage`;
    const ID = process.env.CHAT_ID;

    await axios.post(URL, {
      chat_id: ID,
      parse_mode: "html",
      text: message,
    });

    res.status(200).json({
      status: "success",
      message: "Data send to Telegram",
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const sendToEmail = async (req, res, next) => {
  const { name, email, lang } = req.body;

  try {
    await sendEmail(name, email, lang);

    res.status(200).json({
      status: "success",
      message: "Data send to Email",
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  sendToTelegram,
  sendToEmail,
};
