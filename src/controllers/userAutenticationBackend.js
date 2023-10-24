import connectionDB from "../connectionDB";
import bcrypt from "bcrypt";

export const userRegister = async ({
  username,
  email,
  image,
  password,
  provider,
}) => {
  try {
    const db = await connectionDB();

    const [userExist, schema] = await db.query(
      `SELECT * FROM user WHERE email = ?;`,
      [email]
    );

    if (userExist.length) {
      const userAlreadyRegisteredError = new Error(
        "este email ya ha sido registrado"
      );
      throw userAlreadyRegisteredError;
    }

    const [uuidResult] = await db.query("SELECT UUID() uuid;");
    const [{ uuid: userID }] = uuidResult;

    if (provider === "google") {
      await db.query(
        `INSERT INTO user (id, username, email, image, providers_account)
       VALUES ("${userID}",?,?,?,?);`,
        [username, email, image, JSON.stringify([provider])]
      );
    } else {
      await db.query(
        `INSERT INTO user (id, username, email, password, providers_account)
     VALUES ("${userID}",?,?,?,?);`,
        [username, email, password, JSON.stringify([provider])]
      );
    }

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
    console.log("Error registering: ", error);
    return {
      error: error.message,
      user: {},
      // user: userExist,
    };
  }
};

export const userLogin = async ({ email, password }) => {
  try {
    const db = await connectionDB();
    const [user] = await db.query(
      `SELECT id,username,email,image,password, providers_account FROM user
    WHERE email = (?);`,
      [email]
    );

    if (!user.length) {
      const userNotRegisteredError = new Error("usuario no registrado");
      throw userNotRegisteredError;
    }

    if (!user[0].providers_account.includes("credentials")) {
      const passwordMissingError = new Error("password missing");
      throw passwordMissingError;
    }

    const matchPassword = await bcrypt.compare(password, user[0].password);

    if (matchPassword) {
      return {
        error: null,
        logged: "successfully",
        user: {
          id: user[0].id,
          username: user[0].username,
          email: user[0].email,
          image: user[0].image,
        },
      };
    } else {
      const badPasswordError = new Error("contraseña incorrecta");
      throw badPasswordError;
    }
  } catch (error) {
    console.log("Error logging in: ", error);
    return {
      error: error.message,
      logged: "unsuccessful",
      user: {},
    };
  }
};
