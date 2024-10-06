import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./utils/connect";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Lütfen .env.local dosyanıza MONGODB_URI ekleyin");
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  dbName: "veritabani_adi", // Veritabanı adınızı girin
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Bağlantı hatası:"));
db.once("open", async function () {
  console.log("MongoDB bağlantısı başarılı");

  const username = "admin";
  const password = "admin123";

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    console.log("Admin kullanıcısı zaten mevcut");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = new User({
    username,
    password: hashedPassword,
  });

  await adminUser.save();

  console.log("Admin kullanıcısı başarıyla oluşturuldu");
  process.exit(0);
});
