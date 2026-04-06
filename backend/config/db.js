import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected: ", connect.connection.host);
  } catch (error) {
    console.log("Error Connecting To Data Base", error.message);
    process.exit(1);
  }
};

export default connectDB;
