import mongoose from "mongoose";

let connected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If db is already connected, don't connect again
  if (connected) {
    console.log("Database is already connected");
    return;
  }

  // connect to database
  try {
    await mongoose.connect(process.env.MONBGO_DB_URL);
    connected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");
    console.log(error);
  }
};
