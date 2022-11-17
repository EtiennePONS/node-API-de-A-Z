import { DataSource } from "typeorm";
import dotenv from "dotenv";
/**-----------------Connexion BDD+ sécurité avec dotenv  -----------------------------------------------------*/

dotenv.config({ path: ".env.local" });

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.Db_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;
/**--------------------------------------------------------------------------------------*/
