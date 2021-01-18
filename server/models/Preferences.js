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
