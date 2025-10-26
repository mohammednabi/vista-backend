const Joi = require("joi");
const User = require("../models/User");

const signupValidationSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9_]{3,20}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Username should only contain letters, numbers, and underscores (3-20 characters)",
      "any.required": "Username is required",
      "string.empty": "Username cannot be empty",
    }),
  // .external(async (value, helpers) => {
  //   // Use .external() for async operations
  //   try {
  //     const foundedUser = await User.findOne({ username: value });
  //     if (foundedUser) {
  //       throw new Error("Username already exists");
  //     }
  //     return value;
  //   } catch (error) {
  //     throw new Error("Error checking username availability");
  //   }
  // })
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
  }),
  // .external(async (value, helpers) => {
  //   try {
  //     const foundedUser = await User.findOne({ email: value });
  //     if (foundedUser) {
  //       throw new Error("Email already exists");
  //     }
  //     return value;
  //   } catch (error) {
  //     throw new Error("Error checking email availability");
  //   }
  // })
  password: Joi.string()
    .min(8)
    .max(100)
    .required()
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/)
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at least 100 characters long",
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
    }),
  // .external((value, helpers) => {
  //   // This is synchronous, so .custom() works fine
  //   const strongRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

  //   if (!strongRegex.test(value)) {
  //     return helpers.error("any.custom", {
  //       message:
  //         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  //     });
  //   }
  //   return value;
  // })
  // bio:Joi.string().min(10).max(50),
  // websiteLink:Joi.string().regex("^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$"),
  // image:Joi.string(),
  // gender:Joi.string(),
  // posts:Joi.array(),
  // notifications:Joi.array(),
  // friends:Joi.array(),
  // followers:Joi.array(),
  // following:Joi.array(),
});
const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
  }),
  password: Joi.string()
    .min(8)
    .max(100)
    .required()
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/)
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at least 100 characters long",
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
    }),
});

module.exports = { signupValidationSchema, loginValidationSchema };
