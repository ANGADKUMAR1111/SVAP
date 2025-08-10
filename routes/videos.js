// routes/videos.js
const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "svap/uploads",
    resource_type: "video",
  },
});

const upload = multer({ storage });

router.get("/", videoController.getVideos);
router.post("/", upload.single("video"), videoController.uploadVideo);
router.post("/:id/like", videoController.likeVideo);

module.exports = router;
