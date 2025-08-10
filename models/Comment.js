// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    avatarUrl: { type: String },
    bio: { type: String },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    password: { type: String, required: true }, // ← Added
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
