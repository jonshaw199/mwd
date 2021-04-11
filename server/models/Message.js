const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    postDate: {
      type: Date,
      required: true,
    },
    sendDate: {
      type: Date,
    },
  },
  { collection: "message" }
);

module.exports = mongoose.model("Message", MessageSchema);
