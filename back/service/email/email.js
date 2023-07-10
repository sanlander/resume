const nodemailer = require("nodemailer");
const path = require("path");

module.exports = async function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: `${email}, s.gorshkoder@gmail.com`, // list of receivers
      subject: "Hello ✔", // Subject line
      html: {
        path: path.join(__dirname, "..", "..", "views", "emails", `email.html`),
      },
    });
  } catch (error) {
    console.error(error);
  }
};
