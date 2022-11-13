import { DataSource } from "typeorm";
import dotenv from "dotenv";
/**-----------------Connexion BDD+ sécurité avec dotenv  -----------------------------------------------------*/

dotenv.config({ path: ".env.local" });

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Aur26+ane",
  database: "list_data",
  synchronize: false,
  logging: false,
  entities: [],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;
/**--------------------------------------------------------------------------------------*/
