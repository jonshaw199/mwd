const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Preferences = require("../../models/Preferences");

router.get("/", async (req, res) => {
  const result = await Preferences.findOne();
  return res.status(200).json({ data: result });
});

router.put("/", async (req, res) => {
  Preferences.findOneAndUpdate({}, req.body, (error, data) => {
    return res.status(200).json({ data });
  });
});

module.exports = router;
