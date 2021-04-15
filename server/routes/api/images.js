const express = require("express");
const router = express.Router();
const multer = require("multer");

const Image = require("../../models/Image");
const auth = require("../../middleware/auth");
const Constants = require("../../constants");

const imagesRelativeToPublic = Constants.imagesRelativeToPublic;
const upload = multer({ dest: `public${imagesRelativeToPublic}` });

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
router.put("/:id", auth, upload.single("mwImage"), async (req, res) => {
  try {
    let updatedImage = {};
    if (req.file) {
      updatedImage.filePath = imagesRelativeToPublic;
      updatedImage.fileName = req.file.filename;
      updatedImage.originalFileName = req.file.originalname;
    }
    if (req.body.name) {
      updatedImage.name = req.body.name;
    }
    if (req.body.description) {
      updatedImage.description = req.body.description;
    }
    const data = await Image.findByIdAndUpdate(req.params.id, updatedImage, {
      new: true,
    });
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

router.post("/", auth, upload.single("mwImage"), async (req, res) => {
  const { name, description } = req.body;
  const filePath = imagesRelativeToPublic;
  const fileName = req.file.filename;
  const originalFileName = req.file.originalname;
  const newImage = new Image({
    name,
    description,
    filePath,
    fileName,
    originalFileName,
  });
  try {
    const data = await newImage.save();
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await deleteImage(id);
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ errors: e });
  }
});

module.exports = router;
