const mongoose = require("mongoose");
const User = require("./User");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    media: String,
    mediaType: String,
    type: { type: String, default: "POST" },
    privacy: {
      type: String,
      required: true,
      default: "public",
    },
    hidePostInfo: { type: Boolean, default: false },
    totalLikes: {
      type: Number,

      default: 0,
    },
    totalShares: {
      type: Number,

      default: 0,
    },
    comments: {
      type: Array,
    },
    creator: { type: Object, ref: User },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
