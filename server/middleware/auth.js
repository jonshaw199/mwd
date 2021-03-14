const jwt = require("jsonwebtoken");

const constants = require("../constants");

function auth(req, res, next) {
  const token = req.header("mwd-auth-token");
  if (!token)
    return res.status(401).json({ errors: [constants.errors.auth.NO_TOKEN] });
  try {
    const decoded = jwt.verify(token, process.env.EXPRESS_SERVER_JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res
      .status(400)
      .json({ errors: [constants.errors.auth.INVALID_LOGIN] });
  }
}

module.exports = auth;
