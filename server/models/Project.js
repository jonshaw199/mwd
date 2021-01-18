const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("./Image");

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    primaryImage: { type: Schema.Types.ObjectId, ref: "Image" },
    otherImages: [{ type: Schema.Types.ObjectId, ref: "Image" }],
  },
  { collection: "project" }
);

module.exports = mongoose.model("Project", ProjectSchema);
