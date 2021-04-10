const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Message = require("../../models/Message");

router.post("/", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  const newMessage = new Message({
    firstName,
    lastName,
    email,
    phone,
    message,
  });
  try {
    const data = await newMessage.save();
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

module.exports = router;
