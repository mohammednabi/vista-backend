const express = require("express");
const bodyParser = require("body-parser");
const connectDataBase = require("./src/config/database-config");
const { PostRouter } = require("./src/routes/posts-router");
const { STATUS_CODES } = require("./src/config/constants");
const AuthRouter = require("./src/routes/auth-router");

const cookieParser = require("cookie-parser");
const isAuth = require("./src/middleware/isAuth");
const cors = require("cors");
const { initializeSocket } = require("./src/config/socket");
const messagesRouter = require("./src/routes/messages-router");

require("dotenv").config();

const app = express();

// // CORS HEADERS
// app.use((req, res, next) => {
//   // FRONT_URL
//   // res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_URL);
//   res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_URL);
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH"
//   );
//   // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(cookieParser());

// Routes
app.use("/api/auth", AuthRouter);

// app.use(isAuth);

app.use("/api/posts", isAuth, PostRouter);

app.use("/api/messages", messagesRouter);

// // this is an example for using SSE concept to send notifications to client

// app.use("/notifications", (req, res, next) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   // Send an initial message
//   res.write(`data: notifications Connected to server\n\n`);

//   // Simulate sending updates from the server
//   let counter = 0;
//   const intervalId = setInterval(() => {
//     counter++;
//     // Write the event stream format
//     res.write(`data: Notification ${counter}\n\n`);
//   }, 2000);

//   // When client closes connection, stop sending events
//   req.on("close", () => {
//     clearInterval(intervalId);
//     res.end();
//   });
// });

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
  res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
    success: false,
    message: "failed with error",
    error: error.message,
  });
});

const startServer = async () => {
  try {
    await connectDataBase();
    const httpServer = app.listen(port, () => {
      console.log(`server working on port : ${port}`);
    });

    const io = initializeSocket(httpServer);

    io.on("connection", (socket) => {
      console.log("client connection :" + { socket });
    });
  } catch (err) {
    console.log(`server error`);
  }
};

startServer();
