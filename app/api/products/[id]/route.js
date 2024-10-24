import connect from "@/utils/connect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connect();
    const { id } = params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ message: "Ürün bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ message: "Ürün silindi" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}
