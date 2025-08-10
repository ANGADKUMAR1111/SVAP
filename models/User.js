// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Check if the model already exists (to prevent OverwriteModelError)
if (mongoose.models.User) {
  module.exports = mongoose.model("User");
  return;
}

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true },
    avatarUrl: { type: String },
    bio: { type: String },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    password: { type: String, required: true }, // ✅ Re-added: needed for auth
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Prevent password from being returned in JSON responses
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
