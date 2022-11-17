import AppDataSource from "../data-source";
import Users from "../models/Users";

/**-----------------Partie Algo: methode avec BDD en fonction des requêtes-------------------------*/

class UserService {
  /**----------------- AFFICHE TOUTES LES UserS-------------------------------------*/

  async getAll(): Promise<Users[]> {
    return AppDataSource.query("SELECT * FROM users_table;");
  }

  /**----------------- AFFICHE LES UserS PAR ID-------------------------------------*/

  async getOneUserById(id: number): Promise<Users> {
    return AppDataSource.query(
      `SELECT FROM users_table WHERE Users.id = ${id};`
    );
  }

  /**----------------- CREATION D'UNE NOUVELLE Users-------------------------------------*/

  async createNewUser(newUser: Users): Promise<Users> {
    return AppDataSource.query(`insert into users_table(username, password, email) values(
   '${newUser.username}', '${newUser.hashpass}', '${newUser.email}');`);
  }

  /**----------------- MISE A JOUR D'UNE Users PAR ID-------------------------------------*/

  async updateOneUser(id: number, changes: Users): Promise<Users> {
    return AppDataSource.query(
      `UPDATE users_table SET username= '${changes.username}', password= '${changes.hashpass}',  email= '${changes.email}' WHERE id = ${id};`
    );
  }

  /**----------------- SUPPRESSION D'UNE Users PAR ID-------------------------------------*/

  async deleteOneUser(id: number): Promise<Users> {
    return AppDataSource.query(`DELETE FROM users_table where id=${id}`);
  }
}
export default UserService;
/**------------------------------------------------------------------------------------------------*/
