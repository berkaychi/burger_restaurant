import connect from "@/utils/connect";
import Product from "@/models/Product";
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
    const category = formData.get("category");

    if (!name || !imageFile || !category) {
      return NextResponse.json({ message: "Eksik veri" }, { status: 400 });
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    const newProduct = await Product.create({
      name,
      image: uploadResult.secure_url,
      category,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connect();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}
