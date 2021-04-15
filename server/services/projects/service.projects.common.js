const Project = require("../../models/Project");

const deleteImage = async (projectID, imageID) => {
  const project = await Project.findById(projectID);
  const imageIndex = project.images.indexOf(imageID);
  imageIndex > -1 && project.images.splice(imageIndex, 1);
  project.primaryImage =
    !project.primaryImage || project.primaryImage.toString() === imageID
      ? null
      : project.primaryImage;
  const data = await project.save();
  return data;
};

module.exports = {
  deleteImage,
};
