const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileExtension: {
      type: String,
      required: true,
    },
  },
  { collection: "image" }
);

module.exports = mongoose.model("Image", ImageSchema);
