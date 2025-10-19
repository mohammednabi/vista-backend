const { privacyOptions } = require("../config/constants");
const Post = require("../models/Post");
const postsValidationSchema = require("../validation/postsValidationSchema");

class PostService {
  constructor() {}

  async getAllPosts() {
    try {
      return await Post.find({ $where: { type: "POST" } });
    } catch (err) {
      throw new Error(`Error fetching posts : ${err.message}`);
    }
  }

  async getOnePost(postId) {
    try {
      const foundedPost = await Post.findById(postId);
      if (foundedPost) {
        return foundedPost;
      }
      throw new Error(`post not found`);
    } catch (err) {
      throw new Error(`Error fetching post : ${err.message}`);
    }
  }

  async getAllReels() {
    try {
      return await Post.find({ $where: { type: "REEL" } });
    } catch (err) {
      throw new Error(`Error fetching reels : ${err.message}`);
    }
  }

  async createPost(postData) {
    try {
      postData = await postsValidationSchema.validateAsync(postData);

      const newProduct = new Post(postData);
      return newProduct.save();
    } catch (err) {
      throw new Error(`Error creating posts : ${err.message}`);
    }
  }

  async updatePost(updatedData, postId) {
    try {
      updatedData = await postsValidationSchema.validateAsync(updatedData);

      const foundedPost = await Post.findById(postId);

      const updatedKeys = Object.keys(updatedData);

      const allowedkeys = [
        "content",
        "media",
        "mediaType",
        "privacy",
        "hidePostInfo",
      ];

      updatedKeys.forEach((key) => {
        if (allowedkeys.includes(key)) {
          if (key === "privacy") {
            if (privacyOptions.includes(updatedData[key])) {
              foundedPost[key] = updatedData[key];
            } else {
              throw new Error(`Can't update : ${key}`);
            }
          } else {
            foundedPost[key] = updatedData[key];
          }
        } else {
          throw new Error(`Can't update : ${key}`);
        }
      });

      return foundedPost.save();
    } catch (err) {
      throw new Error(`Error updating post : ${err.message}`);
    }
  }

  async deletePost(postId) {
    try {
      return await Post.deleteOne({ _id: postId });
    } catch (err) {
      throw new Error(`Error deleting post : ${err.message}`);
    }
  }
}

module.exports = new PostService();
