const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");

const auth = require("../../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const result = await Project.find().populate("primaryImage images");
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Project.findById(req.params.id).populate(
      "primaryImage images"
    );
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

/*
  Private routes
*/
router.post("/", auth, async (req, res) => {
  const { name, description, primaryImage, images } = req.body;
  const newProject = new Project({
    name,
    description,
    primaryImage,
    images,
  });
  try {
    const data = await newProject.save();
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const data = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const data = await Project.findByIdAndDelete(req.params.id);
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

module.exports = router;
