const express = require("express");
const router = express.Router();

const Image = require("../../models/Image");
const auth = require("../../middleware/auth");

router.get("/", async (req, res) => {
  const data = await Image.find();
  return res.status(200).json({ data });
});

router.get("/:id", async (req, res) => {
  const data = await Image.findById(req.params.id);
  return res.status(200).json({ data });
});

/*
  Private routes
*/
router.put("/:id", auth, async (req, res) => {
  const data = await Image.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(200).json({ data });
});

router.post("/", auth, async (req, res) => {
  const { name, description, fileName, filePath, fileExtension } = req.body;
  const newImage = new Image({
    name,
    description,
    fileName,
    filePath,
    fileExtension,
  });
  const data = await newImage.save();
  return res.status(200).json({ data });
});

router.delete("/:id", auth, async (req, res) => {
  const data = await Image.findByIdAndDelete(req.params.id);
  return res.status(200).json({ data });
});

module.exports = router;
