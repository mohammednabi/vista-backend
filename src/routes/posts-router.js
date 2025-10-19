const express = require("express");
const PostController = require("../controllers/PostController");

const PostRouter = express.Router();

PostRouter.route("/")
  .get(PostController.getAllPosts)
  .post(PostController.createPost);

PostRouter.route("/:postId")
  .get(PostController.getOnePost)
  .put(PostController.updatePost)
  .delete(PostController.deletePost);

module.exports = { PostRouter };
