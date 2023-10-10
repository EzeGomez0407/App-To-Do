import mysql from "mysql2/promise";

const connectionDB = async () => {
  try {
    const connected = await mysql.createConnection(process.env.DATABASE_URL);
    return connected;
  } catch (error) {
    throw Error(error);
  }
};

export default connectionDB;
