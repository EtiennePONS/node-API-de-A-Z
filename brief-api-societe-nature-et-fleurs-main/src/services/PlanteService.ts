import AppDataSource from "../data-source";
import Plante from "../models/Plante";

/**-----------------Partie Algo: methode avec BDD en fonction des requêtes-------------------------*/

class PlanteService {
  /**----------------- AFFICHE TOUTES LES PLANTES-------------------------------------*/

  async getAll(): Promise<Plante[]> {
    return AppDataSource.query("SELECT * FROM plant;");
  }

  /**----------------- AFFICHE LES PLANTES PAR ID-------------------------------------*/

  async getOnePlantById(id: number): Promise<Plante> {
    return AppDataSource.query(
      `SELECT plant FROM plant WHERE plant.id = ${id};`
    );
  }

  /**----------------- CREATION D'UNE NOUVELLE PLANTE-------------------------------------*/

  async createNewPlant(newPlant: Plante): Promise<Plante> {
    return AppDataSource.query(`insert into plant(name, unitprice_ati, quantity, category, rating, url_picture) values(
   '${newPlant.name}', ${newPlant.unitprice_ati}, ${newPlant.quantity}, '${newPlant.category}', ${newPlant.rating}, '${newPlant.url_picture}');`);
  }

  /**----------------- MISE A JOUR D'UNE PLANTE PAR ID-------------------------------------*/

  async updateOnePlant(id: number, changes: Plante): Promise<Plante> {
    return AppDataSource.query(
      `UPDATE plant SET name= '${changes.name}', unitprice_ati= ${changes.unitprice_ati},  quantity= ${changes.quantity}, category= '${changes.category}', rating= ${changes.rating}, url_picture= '{changes.url_picture}'WHERE id = ${id};`
    );
  }

  /**----------------- SUPPRESSION D'UNE PLANTE PAR ID-------------------------------------*/

  async deleteOnePlant(id: number): Promise<Plante> {
    return AppDataSource.query(`DELETE FROM plant where id=${id}`);
  }
}
export default PlanteService;
/**------------------------------------------------------------------------------------------------*/
