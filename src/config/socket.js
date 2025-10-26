require("dotenv").config();

const { Server } = require("socket.io");

let io;

module.exports = {
  initializeSocket: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: process.env.FRONT_URL,
        credentials: true,
      },
    });

    return io;
  },

  getIo: () => {
    if (!io) {
      throw new Error("Socket Not Initialized");
    }

    return io;
  },
};
