import { NextResponse } from "next/server";
import connectionDB from "@/src/connectionDB";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const db = await connectionDB();

    if (password.trim() == "" || password.trim().length < 4) {
      throw new Error("La contraseña debe tener al menos 4 caracteres");
    }

    const [user] = await db.query(
      "SELECT id,email,username,providers_account FROM user WHERE email = ?;",
      [email]
    );

    if (user.length) {
      const hashPassword = await bcrypt.hash(password, 10);
      const addedProvider = !user[0].providers_account.includes("credentials")
        ? user[0].providers_account.concat("credentials")
        : user[0].providers_account;

      await db.query(
        "UPDATE user SET password = ?, providers_account = ? WHERE id = ?;",
        [hashPassword, JSON.stringify(addedProvider), user[0].id]
      );
    } else {
      const userNotExistError = new Error("email no registrado");
      throw userNotExistError;
    }

    return NextResponse.json({
      user: {
        ...user[0],
        providers_account: user[0].providers_account.concat("credentials"),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
