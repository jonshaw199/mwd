const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const Project = require("../../models/Project");
const Image = require("../../models/Image");
const Preferences = require("../../models/Preferences");
const auth = require("../../middleware/auth");
const Constants = require("../../constants");
const {
  deleteProject: deleteProjectFromPrefs,
  moveProject: moveProjectInPrefs,
  createProject: createProjectInPrefs,
} = require("../../services/preferences/service.preferences.common");
const {
  deleteImage: deleteImageFromProject,
} = require("../../services/projects/service.projects.common");
const { deleteImage } = require("../../services/images/service.images.common");

router.get("/", async (req, res) => {
  try {
    const result = await Project.find().populate("primaryImage images");
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

router.get("/sorted", async (req, res) => {
  try {
    const preferences = await Preferences.findOne().populate({
      path: "content.projects",
      model: "Project",
      populate: { path: "images primaryImage", model: "Image" },
    });
    return res.status(200).json({ data: preferences.content.projects });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

/*
  Private routes
*/
router.post("/", auth, async (req, res) => {
  const newProject = new Project(req.body);
  try {
    const data = await newProject.save();
    await createProjectInPrefs(data._id);
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

router.delete("/:projectID", auth, async (req, res) => {
  const { projectID } = req.params;
  try {
    await deleteProjectFromPrefs(projectID);
    const project = await Project.findById(projectID);
    project.images &&
      project.images.length > 0 &&
      project.images.map(async (image) => {
        deleteImage(image);
      });
    const data = await Project.findByIdAndDelete(projectID);
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

router.post("/:id/image", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    const defaultImage = await Image.findById(
      Constants.internalUseIds.projectImageDefault
    );
    const newImage = new Image({
      filePath: defaultImage.filePath,
      fileName: defaultImage.fileName,
    });
    const response = await newImage.save();
    project.images.push(response._id);
    const data = await project.save();
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

router.delete("/:projectID/image/:imageID", auth, async (req, res) => {
  const { projectID, imageID } = req.params;
  try {
    const data = await deleteImageFromProject(projectID, imageID);
    await deleteImage(imageID);
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

router.post("/:projectID/image/:imageID/move", auth, async (req, res) => {
  const { direction } = req.body;
  const { projectID, imageID } = req.params;
  try {
    const project = await Project.findById(projectID);
    const imageIndex = project.images.indexOf(imageID);
    if (imageIndex === -1)
      return res.status(500).json({ errors: ["Image ID provided is invalid"] });
    if (
      (imageIndex === 0 && direction.toLowerCase() === "up") ||
      (imageIndex >= project.images.length - 1 &&
        direction.toLowerCase() === "down")
    )
      return res.status(500).json({ errors: ["Cant move image any further"] });
    const newImageIndex =
      direction.toLowerCase() === "up" ? imageIndex - 1 : imageIndex + 1;
    const tmpImage = project.images[newImageIndex];
    project.images[newImageIndex] = project.images[imageIndex];
    project.images[imageIndex] = tmpImage;
    project.markModified("images");
    const data = await project.save();
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

router.post("/:projectID/image/:imageID/primary", auth, async (req, res) => {
  const { projectID, imageID } = req.params;
  try {
    const data = await Project.findByIdAndUpdate(
      projectID,
      { primaryImage: imageID },
      { new: true }
    );
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

router.post("/:projectID/move", auth, async (req, res) => {
  const { projectID } = req.params;
  const { direction } = req.body;
  try {
    const data = await moveProjectInPrefs(projectID, direction);
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

module.exports = router;
