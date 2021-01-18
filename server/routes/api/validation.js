const express = require("express");
const router = express.Router();

const { validateEmail, validatePhone } = require("../../utils/validation");

router.post("/", async (req, res) => {
  let validatedFields = {};
  for (const [nameOfFieldToValidate, valueOfFieldToValidate] of Object.entries(
    req.body.fieldsToValidate
  )) {
    switch (nameOfFieldToValidate) {
      case "email":
        validatedFields.email = validateEmail(valueOfFieldToValidate);
        break;
      case "phone":
        validatedFields.phone = validatePhone(valueOfFieldToValidate);
    }
  }
  return res.status(200).json({ data: validatedFields });
});

module.exports = router;
