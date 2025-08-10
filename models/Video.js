// models/Video.js
const mongoose = require("mongoose");

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

module.exports = mongoose.model("Video", videoSchema);
