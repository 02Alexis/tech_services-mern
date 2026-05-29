import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {

  try {

    await mongoose.connect(env.MONGO_URI);

    console.log("MongoDB Atlas conectado");

  } catch (error) {

    console.error("Error MongoDB");

    console.error(error);

    process.exit(1);

  }

};