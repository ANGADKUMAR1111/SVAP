// routes/comments.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.get("/:id", commentController.getComments);
router.post("/:id", commentController.postComment);

module.exports = router;
