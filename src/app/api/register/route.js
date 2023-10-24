import { NextResponse } from "next/server";
import { userRegister } from "@/src/controllers/userAutenticationBackend";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const userData = await request.json();

    if (userData.provider === "google") {
      const { username, email, image, provider } = {
        username: userData.username.trimStart(),
        email: userData.email.trimStart(),
        image: userData.image,
        provider: userData.provider,
      };

      const resultRegister = await userRegister({
        username,
        email,
        image,
        provider,
      });

      return NextResponse.json(resultRegister);
    } else {
      const { username, email, image, password, provider } = {
        username: userData.username.trimStart(),
        email: userData.email.trimStart(),
        image: userData.image,
        password: userData.password.trimStart(),
        provider: userData.provider,
      };

      if (
        username == "" ||
        email == "" ||
        (provider == "credentials" && password == "")
      ) {
        return NextResponse.json({ error: "ningun campo debe estar vacío" });
      }

      const hashPassword = await bcrypt.hash(userData.password, 10);

      const userWithHashedPassword = {
        username,
        email,
        password: hashPassword,
        provider,
      };

      const resultRegister = await userRegister(userWithHashedPassword);

      return NextResponse.json(resultRegister);
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
