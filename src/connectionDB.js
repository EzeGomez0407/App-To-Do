import mysql from "mysql2/promise";

const connectionDB = async () => {
  try {
    console.log("DATABASE ENVIROMENT VARIABLE: " + process.env.DATABASE_URL);
    const connected = await mysql.createConnection(process.env.DATABASE_URL);
    return connected;
  } catch (error) {
    console.log("Error connecting to the DB: ", error);
    throw Error(error);
  }
};

export default connectionDB;
