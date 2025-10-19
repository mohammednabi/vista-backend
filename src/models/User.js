const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
    },
    websiteLink: {
      type: String,
    },
    gender: {
      type: String,
    },
    posts: {
      type: Array,
    },
    notifications: {
      type: Array,
    },
    friends: {
      type: Array,
    },
    followers: {
      type: Array,
    },
    following: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
