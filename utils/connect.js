import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    cohsole.log("Error while connecting.", error);
  }
}
