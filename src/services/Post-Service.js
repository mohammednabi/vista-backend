const { privacyOptions } = require("../config/constants");
const Post = require("../models/Post");
const User = require("../models/User");
const postsValidationSchema = require("../validation/postsValidationSchema");
const mongodb = require("mongodb");
class PostService {
  constructor() {}

  async getAllPosts(page, size) {
    try {
      const totalItems = await Post.countDocuments({
        type: "POST",
      });
      const allPosts = await Post.find({
        type: "POST",
      })
        .skip((page - 1) * size)
        .limit(size);

      const finalData = {
        content: allPosts,
        pagination: {
          page: Number(page),
          size: Number(size),
          totalItems,
          totalPages: Math.ceil(totalItems / size),
        },
      };

      return finalData;
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

  async getAllReels(page, size) {
    try {
      const totalItems = await Post.countDocuments({
        type: "REEL",
      });
      const allPosts = await Post.find({
        type: "REEL",
      })
        .skip((page - 1) * size)
        .limit(size);

      const finalData = {
        content: allPosts,
        pagination: {
          page: Number(page),
          size: Number(size),
          totalItems,
          totalPages: Math.ceil(totalItems / size),
        },
      };
      return finalData;
    } catch (err) {
      throw new Error(`Error fetching reels : ${err.message}`);
    }
  }

  async createPost(postData, userId) {
    try {
      let allData = await postsValidationSchema.validateAsync({
        ...postData,
        creator: userId,
      });

      const newPost = new Post(allData);

      const foundedUser = await User.findById(new mongodb.ObjectId(userId));

      foundedUser.posts.push(newPost._id);

      foundedUser.save();

      console.log({ foundedUser });

      return newPost.save();
    } catch (err) {
      throw new Error(`Error creating posts : ${err.message}`);
    }
  }

  async updatePost(updatedData, postId, userId) {
    try {
      const foundedPost = await Post.findById(postId);

      if (String(foundedPost.creator) !== String(userId)) {
        const error = new Error("You are not allowed");
        error.statusCode = 403;
        throw error;
      }

      let fullData = await postsValidationSchema.validateAsync({
        ...updatedData,
        creator: userId,
      });

      const allowedkeys = [
        "content",
        "media",
        "mediaType",
        "privacy",
        "hidePostInfo",
      ];

      Object.keys(fullData).forEach((key) => {
        if (!allowedkeys.includes(key)) {
          delete fullData[key];
        }
      });

      const updatedKeys = Object.keys(fullData);

      updatedKeys.forEach((key) => {
        if (allowedkeys.includes(key)) {
          if (key === "privacy") {
            if (privacyOptions.includes(fullData[key])) {
              foundedPost[key] = fullData[key];
            } else {
              throw new Error(`Can't update : ${key}`);
            }
          } else {
            foundedPost[key] = fullData[key];
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

  async deletePost(postId, userId) {
    try {
      const foundedPost = await Post.findById(postId);

      if (String(foundedPost.creator) !== String(userId)) {
        const error = new Error("You are not allowed");
        error.statusCode = 403;
        throw error;
      }

      const foundedUser = await User.findById(userId);

      foundedUser.posts.pull(postId);
      foundedUser.save();

      return await Post.deleteOne({ _id: postId });
    } catch (err) {
      throw new Error(`Error deleting post : ${err.message}`);
    }
  }
}

module.exports = new PostService();
