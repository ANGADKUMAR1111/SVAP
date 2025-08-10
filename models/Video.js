// models/Video.js
const mongoose = require("mongoose");

// 👇 Prevent OverwriteModelError in development
if (mongoose.models.Video) {
  module.exports = mongoose.model("Video");
  return;
}

const videoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  description: { type: String },
  user: {
    id: String,
    username: String,
    displayName: String,
    avatarUrl: String,
  },
  likes: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  createdAt: { type: Number, default: Date.now },
});

// Create and export the model
const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
