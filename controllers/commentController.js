// controllers/commentController.js
const Comment = require("../models/Comment");
const Video = require("../models/Video");
const { v4: uuidv4 } = require("uuid");

// GET comments by video ID
exports.getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ videoId: id }).sort({
      timestamp: -1,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST comment
exports.postComment = async (req, res) => {
  try {
    const { id: videoId } = req.params;
    const { videoId: _, ...commentData } = req.body;

    const video = await Video.findOne({ id: videoId });
    if (!video) return res.status(404).json({ message: "Video not found" });

    const newComment = new Comment({
      id: uuidv4(),
      videoId,
      user: commentData.user,
      text: commentData.text,
      timestamp: Date.now(),
      likes: commentData.likes || 0,
    });

    await newComment.save();

    video.commentsCount += 1;
    await video.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
