import { Request, Response } from "express";
import User from "../models/Users";
import UserService from "../services/UserService";
import bcrypt, { hash } from "bcrypt";

/**-----------------Check les différentes requêtes afin de déterminer si les paramètres sont ok---------------------*/

class UserController {
  private UserService = new UserService();

  /**----------------- AFFICHE TOUTES LES UserS-------------------------------------*/

  async getAll(req: Request, res: Response) {
    try {
      const allUsers = await this.UserService.getAll();
      res.send({ status: "OK :)", data: allUsers });
    } catch (error) {
      res.send({ status: "FAILED", message: error });
    }
  }

  /**----------------- AFFICHE LES UserS PAR ID-------------------------------------*/

  async getOneUserById(req: Request, res: Response) {
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
      const oneUser = await this.UserService.getOneUserById(id);
      res.send({ status: "OK", data: oneUser });
    } catch (error) {
      res.send({ status: "FAILED", message: error });
    }
  }

  /**----------------- CREATION D'UNE NOUVELLE User-------------------------------------*/

  async createNewUser(req: Request, res: Response) {
    const newUser: User = { ...req.body };
    // bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(newUser.password, 12, async (err, hashpass) => {
      try {
        newUser.hashpass = hashpass;
        await this.UserService.createNewUser(newUser);
        res.send({
          status: "OK",
          message: `Nouvel User crée!!!!`,
          data: newUser,
        });
      } catch (error: any) {
        res.send({ message: error?.message });
      }
    });
  }

  /**----------------- MISE A JOUR D'UNE User PAR ID-------------------------------------*/

  async updateOneUser(req: Request, res: Response) {
    const changes: User = {
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
    } else if (!changes.username || !changes.password || !changes.email) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "L'une des clés suivantes est manquante ou vide dans le req.body: name, password, email",
        },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.UserService.updateOneUser(id, changes);
      res.status(201).send({
        status: "OK",
        message: `La User avec l'ID ${id} est mis à jour`,
      });
    } catch (error: any) {
      res.send({ message: error?.message });
    }
  }

  /**----------------- SUPPRESSION D'UNE User PAR ID-------------------------------------*/

  async deleteOneUser(req: Request, res: Response): Promise<void> {
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
      await this.UserService.deleteOneUser(id);
      res.status(200).send({
        status: "OK",
        message: `La User avec l' id ${id} est supprimé`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
}

export default UserController;
/**-----------------------------------------------------------------------------------------------*/
