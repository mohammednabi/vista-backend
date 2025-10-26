const express = require("express");
const io = require("../config/socket");

const messagesRouter = express.Router();

let messages = [];

messagesRouter.get("", (req, res, next) => {
  res.status(200).json({ messages });
});

messagesRouter.post("", (req, res, next) => {
  messages.push(req.body.message);

  io.getIo().emit("messages", { action: "create", messages });
  res.status(200).json({ message: "success sending this message" });
});

module.exports = messagesRouter;
