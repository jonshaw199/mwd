const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const constants = require("../../constants");
const auth = require("../../middleware/auth");

router.get("/user", auth, async (req, res) => {
  const data = await User.findById(req.user.id).select("-password");
  return res.status(200).json({ data });
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user)
    return res
      .status(400)
      .json({ errors: [constants.errors.user.USER_DOESNT_EXIST] });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res
      .status(400)
      .json({ errors: [constants.errors.auth.INVALID_LOGIN] });
  const token = jwt.sign(
    { id: user.id },
    process.env.EXPRESS_SERVER_JWT_SECRET,
    {
      expiresIn: global.preferences.auth.tokenExpiration,
    }
  );
  return res.status(200).json({
    data: {
      token,
      user,
    },
  });
});

module.exports = router;
