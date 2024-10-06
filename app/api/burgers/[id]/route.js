import dbConnect from "@/utils/connect";
import Burger from "@/models/Burger";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary yapılandırması
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = params;

  // Burgeri bulun
  const burger = await Burger.findById(id);
  if (!burger) {
    return NextResponse.json({ message: "Burger bulunamadı" }, { status: 404 });
  }

  // Cloudinary'den resmi silin
  const publicId = getPublicIdFromUrl(burger.image);
  await cloudinary.uploader.destroy(publicId);

  // Veritabanından burgeri silin
  await Burger.findByIdAndDelete(id);

  return NextResponse.json({ message: "Burger silindi" }, { status: 200 });
}

// Yardımcı fonksiyon: Cloudinary public_id'yi URL'den alır
function getPublicIdFromUrl(url) {
  const parts = url.split("/");
  const publicIdWithExtension = parts[parts.length - 1];
  const [publicId] = publicIdWithExtension.split(".");
  return `burgers/${publicId}`;
}
