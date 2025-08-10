// controllers/userController.js
const User = require("../models/User");

// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST follow user
exports.followUser = async (req, res) => {
  try {
    const { id: targetId } = req.params;
    const targetUser = await User.findOne({ id: targetId });
    if (!targetUser) return res.status(404).json({ message: "User not found" });

    targetUser.followers += 1;
    await targetUser.save();
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST unfollow user
exports.unfollowUser = async (req, res) => {
  try {
    const { id: targetId } = req.params;
    const targetUser = await User.findOne({ id: targetId });
    if (!targetUser) return res.status(404).json({ message: "User not found" });

    targetUser.followers = Math.max(0, targetUser.followers - 1);
    await targetUser.save();
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findOne({ id });
    if (!user) return res.status(404).json({ message: "User not found" });

    Object.assign(user, updates);
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
