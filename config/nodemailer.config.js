require("dotenv").config();

const { createTransport } = require("nodemailer");

let config = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
};

const transport = createTransport(config);

module.exports = transport;
