// controllers/videoController.js
const Video = require("../models/Video");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");
const { v4: uuidv4 } = require("uuid");

// GET all videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST upload video
exports.uploadVideo = async (req, res) => {
  try {
    const { description, userId } = req.body;

    // Find user
    const user = await User.findOne({ id: userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    let videoUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
        folder: "svap/videos",
      });
      videoUrl = result.secure_url;
    }

    const newVideo = new Video({
      id: uuidv4(),
      url: videoUrl,
      description,
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
      },
      createdAt: Date.now(),
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST like video
exports.likeVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findOne({ id });
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.likes += 1;
    await video.save();
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
