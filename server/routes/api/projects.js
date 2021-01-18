const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");

const auth = require("../../middleware/auth");

router.get("/", async (req, res) => {
  const result = await Project.find().populate("primaryImage otherImages");
  return res.status(200).json({ data: result });
});

router.get("/:id", async (req, res) => {
  const result = await Project.findById(req.params.id).populate(
    "primaryImage otherImages"
  );
  return res.status(200).json({ data: result });
});

/*
  Private routes
*/
router.post("/", auth, async (req, res) => {
  const { name, description, primaryImage, otherImages } = req.body;
  const newProject = new Project({
    name,
    description,
    primaryImage,
    otherImages,
  });
  const data = await newProject.save();
  return res.status(200).json({ data });
});

router.put("/:id", auth, async (req, res) => {
  const data = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(200).json({ data });
});

router.delete("/:id", auth, async (req, res) => {
  const data = await Project.findByIdAndDelete(req.params.id);
  return res.status(200).json({ data });
});

module.exports = router;
