const nodemailer = require("nodemailer");
const pug = require("pug");
const path = require("path");
const { convert } = require("html-to-text");

const allLang = ["en", "ua"];
const langDataBack = require("../../views/lang/langDataBack.json");

module.exports = async function sendEmail(name, email, lang) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  if (!allLang.includes(lang)) lang = "en";

  const currentYear = new Date().getFullYear();

  const html = pug.renderFile(
    path.join(__dirname, "..", "..", "views", "emails", `letter_${lang}.pug`),
    {
      email,
      name,
      currentYear,
    }
  );

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email, // `${email}, s.gorshkoder@gmail.com`
      subject: `${langDataBack.subjectLetter[lang]} RESUME (gorshkoder.pp.ua) ✔`,
      html,
      text: convert(html),
    });
  } catch (error) {
    console.error(error);
  }
};
