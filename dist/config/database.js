import dotenv from "dotenv";
import pg from "pg";
dotenv.config();
var Pool = pg.Pool;
var databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};
var connection = new Pool(databaseConfig);
export default connection;
