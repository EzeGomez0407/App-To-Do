import { NextResponse } from "next/server";
import connectionDB from "@/src/connectionDB";

export async function POST(request) {
  try {
    const { email } = await request.json();
    const db = await connectionDB();

    const [user] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    if (user.length) return NextResponse.json(user[0]);

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
