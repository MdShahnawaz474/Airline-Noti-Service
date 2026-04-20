const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASSWORD } = require("./server-config");

// console.log(EMAIL_PASSWORD,EMAIL_USER);

const mailSender = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

module.exports = {
  mailSender,
};
