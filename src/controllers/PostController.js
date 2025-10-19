const { STATUS_CODES } = require("../config/constants");
const PostService = require("../services/Post-Service");

class PostController {
  constructor() {}

  async getAllPosts(req, res, next) {
    let currentPage = req.query.page || 1;
    let size = req.query.size || 10;
    if (Number(currentPage) <= 0) {
      currentPage = 1;
    }

    if (Number(size) <= 0) {
      size = 10;
    }
    try {
      const data = await PostService.getAllPosts(currentPage, size);
      res.status(STATUS_CODES.SUCCESS).json({
        message: "Success fetching posts",
        data: data,
      });
    } catch (err) {
      //   res.status(STATUS_CODES.SERVER_ERROR).json({
      //     message: err.message,
      //   });
      console.log("error fetching posts");
      next(err);
    }
  }

  async getOnePost(req, res, next) {
    const postId = req.params.postId;
    try {
      const data = await PostService.getOnePost(postId);
      res.status(STATUS_CODES.SUCCESS).json({
        message: "Success fetching post",
        content: data,
      });
    } catch (err) {
      console.log("error fetching post");
      next(err);
    }
  }

  async createPost(req, res, next) {
    const body = req.body;
    try {
      await PostService.createPost(body);
      res.status(STATUS_CODES.SUCCESS).json({
        message: "Success create post",
      });
    } catch (err) {
      console.log("error create post");
      next(err);
    }
  }

  async updatePost(req, res, next) {
    const postId = req.params.postId;
    const body = req.body;
    try {
      await PostService.updatePost(body, postId);
      res.status(STATUS_CODES.SUCCESS).json({
        message: "Success update post",
      });
    } catch (err) {
      console.log("error update post");
      next(err);
    }
  }

  async deletePost(req, res, next) {
    const postId = req.params.postId;
    try {
      await PostService.deletePost(postId);
      res.status(STATUS_CODES.SUCCESS).json({
        message: "Success delete post",
      });
    } catch (err) {
      console.log("error delete post");
      next(err);
    }
  }
}

module.exports = new PostController();
