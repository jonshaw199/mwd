const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreferencesSchema = new Schema(
  {
    companyInfo: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      phoneNumber: {
        type: String,
        trim: true,
        required: true,
      },
      email: {
        type: String,
        trim: true,
        required: true,
      },
      address: {
        streedAddress: {
          type: String,
          trim: true,
          required: true,
        },
        city: {
          type: String,
          trim: true,
          required: true,
        },
        state: {
          type: String,
          trim: true,
          required: true,
        },
        zip: {
          type: String,
          trim: true,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
        latitude: {
          type: Number,
          required: true,
        },
      },
    },
    content: {
      about: {
        type: String,
        trim: true,
        required: true,
      },
      contact: {
        type: String,
        trim: true,
        required: true,
      },
    },
    auth: {
      tokenExpiration: {
        type: Number,
        required: true,
      },
    },
  },
  { collection: "preferences" }
);

module.exports = mongoose.model("Preferences", PreferencesSchema);
