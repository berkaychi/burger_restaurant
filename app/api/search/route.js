import connect from "@/utils/connect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connect();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Arama hatası:", error);
    return NextResponse.json(
      { message: "Arama yapılırken hata oluştu" },
      { status: 500 }
    );
  }
}
