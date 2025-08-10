// controllers/authController.js
const User = require("../models/User");
const generateToken = require("../utils/jwt");
const { v4: uuidv4 } = require("uuid");

// Helper: Check if username exists
const userExists = async (username) => {
  return await User.findOne({ username });
};

// POST: /auth/signup
exports.signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    if (!username || !password || !displayName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (await userExists(username)) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const userId = uuidv4();

    const user = new User({
      id: userId,
      username,
      displayName,
      password, // Will be hashed before save
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        displayName
      )}`,
    });

    // Hash password (we'll use middleware or pre-save hook)
    await user.save();

    const token = generateToken(user.id);

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: /auth/login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    res.json({
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
