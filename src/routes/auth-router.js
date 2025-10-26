const express = require("express");
const AuthController = require("../controllers/AuthController");

const AuthRouter = express.Router();

AuthRouter.post("/signup", AuthController.signup);
AuthRouter.post("/login", AuthController.login);

module.exports = AuthRouter;
