import connectionDB from "../connectionDB";
import bcrypt from "bcrypt";

export const userRegister = async ({ username, email, password }) => {
  try {
    const db = await connectionDB();

    const [userExist, schema] = await db.query(
      `SELECT * FROM user WHERE email = ?;`,
      [email]
    );

    if (userExist.length) {
      return { error: "este email ya ha sido registrado" };
    }

    const [uuidResult] = await db.query("SELECT UUID() uuid;");
    const [{ uuid: userID }] = uuidResult;

    await db.query(
      `INSERT INTO user (id, username, email, password)
     VALUES ("${userID}",?,?,?);`,
      [username, email, password]
    );

    const [users] = await db.query(
      `SELECT * FROM user
     WHERE id = "${userID}";`
    );

    return {
      error: null,
      message: "user created successfully",
      user: users[0],
      // user: userExist,
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const userLogin = async ({ email, password }) => {
  try {
    const db = await connectionDB();
    const [users] = await db.query(
      `SELECT id,username,email,password FROM user
    WHERE email = (?);`,
      [email]
    );

    if (!users.length) {
      return {
        error:
          "el usuario no esta registrado o algunos de los campos son incorrectos",
        logged: "unsuccessful",
        user: {},
      };
    }

    const matchPassword = await bcrypt.compare(password, users[0].password);

    if (matchPassword) {
      return {
        error: null,
        logged: "successfully",
        user: {
          id: users[0].id,
          username: users[0].username,
          email: users[0].email,
        },
      };
    } else {
      return {
        error: "la contraseña es incorrecta",
        logged: "unsuccessful",
        user: {},
      };
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
