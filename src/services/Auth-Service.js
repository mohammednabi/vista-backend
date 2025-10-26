const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  signupValidationSchema,
  loginValidationSchema,
} = require("../validation/authValidationSchema");

const jwt = require("jsonwebtoken");

class AuthService {
  async signup(data) {
    try {
      data = await signupValidationSchema.validateAsync(data);

      const foundedUserEmail = await User.findOne({ email: data.email });
      const foundedUserUserName = await User.findOne({
        username: data.username,
      });

      if (foundedUserUserName) {
        throw new Error("username is already exists");
      }

      if (foundedUserEmail) {
        throw new Error("email is already exists");
      }

      let hashedPassword = "";
      await bcrypt.hash(data.password, 12).then((hashed) => {
        hashedPassword = hashed;
      });

      const user = new User({
        username: data.username,
        email: data.email,
        password: hashedPassword,
      });

      return user.save();
    } catch (err) {
      throw new Error(`Error signup : ${err.message}`);
    }
  }

  async login(data) {
    try {
      data = await loginValidationSchema.validateAsync(data);
      const foundedUser = await User.findOne({ email: data.email });

      if (!foundedUser) {
        throw new Error("Bad Credentials");
      }

      return bcrypt
        .compare(data.password, foundedUser.password)
        .then((isSame) => {
          if (isSame) {
            const token = jwt.sign(
              {
                email: foundedUser.email,
                userId: foundedUser._id,
                image: foundedUser.image,
                username: foundedUser.username,
                name: foundedUser.name,
              },
              "NeboSecretKeyFromServer",
              {
                expiresIn: "1h",
              }
            );
            return { token, userId: foundedUser._id };
          }
          throw new Error("Bad Credentials");
        });
    } catch (err) {
      throw new Error(`Error login : ${err.message}`);
    }
  }
}

module.exports = new AuthService();
