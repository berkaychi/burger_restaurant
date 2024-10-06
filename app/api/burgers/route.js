import connect from "@/utils/connect";
import Burger from "@/models/Burger";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    await connect();

    const formData = await request.formData();
    const name = formData.get("name");
    const imageFile = formData.get("image");

    if (!name || !imageFile) {
      return NextResponse.json({ message: "Eksik veri" }, { status: 400 });
    }

    // Resmi buffer olarak al
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Resmi Cloudinary'e yükle
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "burgers" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    // Yeni burgeri oluştur
    const newBurger = await Burger.create({
      name,
      image: uploadResult.secure_url,
    });

    return NextResponse.json(newBurger, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connect();
    const burgers = await Burger.find({});
    return NextResponse.json(burgers, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}
