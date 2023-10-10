import { NextResponse } from "next/server";
import connectionDB from "@/src/connectionDB";

export async function GET() {
  try {
    const db = await connectionDB();

    const res = await db.query("SHOW TABLES;");

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}
