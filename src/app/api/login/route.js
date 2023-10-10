import { NextResponse } from "next/server";
import { userLogin } from "@/src/controllers/userAutenticationBackend";

export async function POST(request) {
  try {
    const userData = await request.json();

    const userLoggedIn = await userLogin(userData);

    return NextResponse.json(userLoggedIn);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
