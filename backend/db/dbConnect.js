import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      "✅ DB connected successfully at host:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("❌ DB connection failed!", error.message);
    process.exit(1);
  }
};

export { dbConnect };
