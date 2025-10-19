const joi = require("joi");

const postsValidationSchema = joi.object({
  content: joi.string().min(20).max(350).required(),
  media: joi.string(),
  mediaType: joi.string(),
  privacy: joi.string().default("public"),
  type: joi.string().default("post"),
  hidePostInfo: joi.boolean().default(false),
  totalLikes: joi.number().integer(),
  totalShares: joi.number().integer(),
  comments: joi.array(),
  creator: joi.any(),
});

module.exports = postsValidationSchema;
