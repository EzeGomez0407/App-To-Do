import { NextResponse } from "next/server";
import { userRegister } from "@/src/controllers/userAutenticationBackend";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const userData = await request.json();

    const { username, email, password } = {
      username: userData.username.trimStart(),
      email: userData.email.trimStart(),
      password: userData.password.trimStart(),
    };
    if (username == "" || email == "" || password == "") {
      return NextResponse.json({ error: "ningun campo debe estar vacío" });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);

    const userWithHashedPassword = {
      username,
      email,
      password: hashPassword,
    };

    const resultRegister = await userRegister(userWithHashedPassword);

    return NextResponse.json(resultRegister);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
