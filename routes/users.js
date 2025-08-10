// routes/users.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:id", userController.getUserById);
router.post("/:id/follow", userController.followUser);
router.post("/:id/unfollow", userController.unfollowUser);
router.put("/:id", userController.updateUserProfile);

module.exports = router;
