import { NextResponse } from "next/server";
import connectionDB from "@/src/connectionDB";

export async function POST(request) {
  try {
    const { name, email } = await request.json();
    const db = await connectionDB();

    const [uuidResult] = await db.query("SELECT UUID() uuid;");
    const [{ uuid: userID }] = uuidResult;

    console.log(uuidResult);

    const newUserResult = await db.query(
      `INSERT INTO user (id,username,email) VALUES ("${userID}",?,?);`,
      [name, email]
    );

    return NextResponse.json(newUserResult);
  } catch (error) {
    console.log(error);
  }
}
