// models/Comment.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  videoId: { type: String, required: true },
  user: {
    id: String,
    username: String,
    displayName: String,
    avatarUrl: String,
  },
  text: { type: String, required: true },
  timestamp: { type: Number, default: Date.now },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Comment", commentSchema);
