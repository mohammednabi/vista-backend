const { STATUS_CODES } = require("../config/constants");
const AuthService = require("../services/Auth-Service");

class AuthController {
  async signup(req, res, next) {
    const bodyData = req.body;
    try {
      const user = await AuthService.signup(bodyData);
      res.status(STATUS_CODES.SUCCESS).json({
        message: "Success Signup",
        userId: user._id,
      });
    } catch (err) {
      console.log("error signup");
      next(err);
    }
  }

  async login(req, res, next) {
    const bodyData = req.body;
    const data = await AuthService.login(bodyData);
    // res.cookie("access_token", data.token, {
    //   httpOnly: true,
    //   maxAge: 20 * 24 * 1000 * 3600,
    // });
    res.status(STATUS_CODES.SUCCESS).json({
      message: "Success login",

      ...data,
    });
    try {
    } catch (err) {
      console.log("error login");
      next(err);
    }
  }
}

module.exports = new AuthController();
