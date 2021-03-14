const validateEmail = (email) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase())
    ? ""
    : "This doesn't look like a valid email address";
};

const validatePhone = (phone) => {
  const phoneRegex = /\d{10}/;
  return phoneRegex.test(String(phone))
    ? ""
    : "This doesn't look like a valid phone number";
};

const validateUsername = (username) => {
  return "";
};

const validatePassword = (password) => {
  return "";
};

module.exports = {
  validateEmail,
  validatePhone,
  validateUsername,
  validatePassword,
};
