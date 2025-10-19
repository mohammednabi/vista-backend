require("dotenv").config();
const mongoose = require("mongoose");

const connectDataBase = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      dbName: "vista",
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDataBase;
