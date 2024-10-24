import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI hatalı.");
}

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "veritabani_adi",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB bağlantısı başarılı");
  } catch (error) {
    console.error("MongoDB bağlantı hatası:", error);
  }
}
