const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const constants = require("../../constants");
// const auth = require("../../middleware/auth");

router.get("/", async function (req, res, next) {
  const result = await User.find();
  return res.status(200).json({ data: result });
});

router.get("/:id", async (req, res, next) => {
  const data = await User.findById(req.params.id);
  return res.status(200).json({ data });
});

router.post("/", async function (req, res, next) {
  const { firstName, lastName, email, username, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const newUser = new User({
    firstName,
    lastName,
    email,
    username,
    password: hash,
  });
  newUser.save((error, data) => {
    if (error) {
      switch (error.code) {
        case 11000:
          return res
            .status(400)
            .json({ errors: [constants.errors.user.DUPLICATE_USER] });
        default:
          return next(error);
      }
    }
    const token = jwt.sign(
      { id: newUser.id },
      process.env.EXPRESS_SERVER_JWT_SECRET,
      {
        expiresIn: global.preferences.auth.tokenExpiration,
      }
    );
    return res.status(200).json({
      data: {
        token,
        user: data,
      },
    });
  });
});

router.put("/:id", async (req, res) => {
  const user = req.body;
  if (req.body.password) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password, salt);
    user.password = hash;
  }
  User.findByIdAndUpdate(req.params.id, user, { new: true }, (error, data) => {
    if (error) {
      switch (error.code) {
        case 11000:
          return res
            .status(400)
            .json({ errors: [constants.errors.user.DUPLICATE_USER] });
        default:
          return next(error);
      }
    }
    return res.status(200).json({ data });
  });
});

module.exports = router;
