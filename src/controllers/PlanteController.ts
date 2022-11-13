import { Request, Response } from "express";
import Plante from "../models/Plante";
import PlanteService from "../services/PlanteService";

/**-----------------Check les différentes requêtes afin de déterminer si les paramètres sont ok---------------------*/

class PlanteController {
  private planteService = new PlanteService();

  /**----------------- AFFICHE TOUTES LES PLANTES-------------------------------------*/

  async getAll(req: Request, res: Response) {
    try {
      const allPlants = await this.planteService.getAll();
      res.send({ status: "OK :)", data: allPlants });
    } catch (error) {
      res.send({ status: "FAILED", message: error });
    }
  }

  /**----------------- AFFICHE LES PLANTES PAR ID-------------------------------------*/

  async getOnePlantById(req: Request, res: Response) {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "L'Id doit être paramétré :(" },
      });
      return;
    }
    try {
      const id = parseInt(paramId);
      const onePlant = await this.planteService.getOnePlantById(id);
      res.send({ status: "OK", data: onePlant });
    } catch (error) {
      res.send({ status: "FAILED", message: error });
    }
  }

  /**----------------- CREATION D'UNE NOUVELLE PLANTE-------------------------------------*/

  async createNewPlant(req: Request, res: Response) {
    const newPlant: Plante = {
      ...req.body,
    };
    console.log(newPlant);
    if (
      !newPlant.name ||
      newPlant.unitprice_ati === undefined ||
      newPlant.quantity === undefined ||
      newPlant.category === undefined ||
      newPlant.rating === undefined ||
      newPlant.url_picture === undefined
    ) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "L'une des clés suivantes est manquante ou vide dans le req.body: 'name', 'unitprice_ati', 'quantity','category','rating','url_picture'",
        },
      });
      return;
    }

    try {
      await this.planteService.createNewPlant(newPlant);
      res.status(200).send({
        status: "OK",
        message: `Nouvelle Plante crée!!!!`,
        data: newPlant,
      });
    } catch (error) {
      res.send({ status: "FAILED" });
    }
  }

  /**----------------- MISE A JOUR D'UNE PLANTE PAR ID-------------------------------------*/

  async updateOnePlant(req: Request, res: Response) {
    const changes: Plante = {
      ...req.body,
    };
    console.log(changes);
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "L'Id doit être paramétré :(" },
      });
      return;
    } else if (
      !changes.name ||
      !changes.unitprice_ati ||
      !changes.quantity ||
      !changes.category ||
      !changes.rating ||
      !changes.url_picture
    ) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "L'une des clés suivantes est manquante ou vide dans le req.body: name,unitprice_ati,quantity,category,rating,url_picture ",
        },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.planteService.updateOnePlant(id, changes);
      res.status(201).send({
        status: "OK",
        message: `La plante avec l'ID ${id} est mis à jour`,
      });
    } catch (error: any) {
      res.send({ message: error?.message });
    }
  }

  /**----------------- SUPPRESSION D'UNE PLANTE PAR ID-------------------------------------*/

  async deleteOnePlant(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "L'ID doit être paramétré" },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.planteService.deleteOnePlant(id);
      res.status(200).send({
        status: "OK",
        message: `La Plante avec l' id ${id} est supprimé`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
}

export default PlanteController;
/**-----------------------------------------------------------------------------------------------*/
