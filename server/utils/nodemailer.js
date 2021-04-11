const nodemailer = require("nodemailer");

var emailService = process.env.EMAIL_SERVICE;
var emailUser = process.env.EMAIL_USER;
var emailPassword = process.env.EMAIL_PASSWORD;

class NodemailerUtils {
  constructor() {
    this.createTransporter();
  }

  createTransporter() {
    this.transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });
  }

  // mailOptions = from, to, subject, text
  sendMail(mailOptions, successCB, failureCB) {
    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        failureCB && failureCB(error);
      } else {
        successCB && successCB(info);
      }
    });
  }
}

module.exports = new NodemailerUtils();
