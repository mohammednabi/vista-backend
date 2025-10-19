const express = require("express");
const bodyParser = require("body-parser");
const connectDataBase = require("./src/config/database-config");
const { PostRouter } = require("./src/routes/posts-router");
const { STATUS_CODES } = require("./src/config/constants");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

// Routes
app.use("/api/posts", PostRouter);

// connecting database

const port = process.env.SERVER_PORT || 5050;

// // 404 handler
// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// public error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(STATUS_CODES.SERVER_ERROR).json({
    success: false,
    message: "Internal server error",
    error: error.message,
  });
});

const startServer = async () => {
  try {
    await connectDataBase();
    app.listen(port, () => {
      console.log(`server working on port : ${port}`);
    });
  } catch (err) {
    console.log(`server error`);
  }
};

startServer();
