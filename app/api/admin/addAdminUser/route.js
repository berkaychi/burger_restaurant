import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(request) {
  await dbConnect();

  const { username, password } = await request.json();

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return NextResponse.json(
      { message: "Admin kullanıcısı zaten mevcut" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = new User({
    username,
    password: hashedPassword,
  });

  await adminUser.save();

  return NextResponse.json(
    { message: "Admin kullanıcısı başarıyla oluşturuldu" },
    { status: 201 }
  );
}
