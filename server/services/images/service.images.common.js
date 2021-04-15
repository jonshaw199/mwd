const fs = require("fs").promises;
var path = require("path");

const Image = require("../../models/Image");
const Constants = require("../../constants");

const deleteImage = async (imageID) => {
  const image = await Image.findById(imageID);
  if (
    image &&
    image.fileName !== Constants.internalUseIds.projectImageDefaultName
  ) {
    const imagePath = path.resolve(
      `./public${image.filePath}/${image.fileName}`
    );
    try {
      await fs.unlink(imagePath);
    } catch (e) {}
  }
  await Image.findByIdAndDelete(imageID);
  return image;
};

module.exports = {
  deleteImage,
};
