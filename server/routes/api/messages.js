const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Message = require("../../models/Message");
const NodemailerUtils = require("../../utils/nodemailer");

router.post("/", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  const newMessage = new Message({
    firstName,
    lastName,
    email,
    phone,
    message,
    postDate: Date.now(),
  });
  try {
    const data = await newMessage.save();
    const mailOptions = {
      from: email,
      to: global.preferences.companyInfo.email,
      subject: "Contact form message",
      text: message,
    };
    NodemailerUtils.sendMail(
      mailOptions,
      async function (info) {
        newMessage.sendDate = Date.now();
        const updateData = await newMessage.save();
        return res
          .status(200)
          .json({ data: { mongoData: updateData, nodemailderInfo: info } });
      },
      function (error) {
        return res.status(500).json({ errors: error });
      }
    );
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

module.exports = router;
