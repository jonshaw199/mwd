const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("./Project");

const PreferencesSchema = new Schema(
  {
    companyInfo: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      phoneMasked: {
        type: String,
        trim: true,
        required: true,
      },
      phoneUnmasked: {
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
        streetAddress: {
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
      contact1: {
        type: String,
        trim: true,
        required: true,
      },
      contact2: {
        type: String,
        trim: true,
        required: true,
      },
      projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
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
