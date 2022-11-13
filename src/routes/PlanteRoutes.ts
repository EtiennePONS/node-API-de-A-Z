import { Router } from "express";
import PlanteController from "../controllers/PlanteController";
/**-----------------Aiguillage des différentes requêtes vers le controller-------------------------*/

const planteRouter = Router();
const planteController = new PlanteController();

planteRouter.get("/", (req, res) => {
  planteController.getAll(req, res);
});
planteRouter.get("/:id", (req, res) => {
  planteController.getOnePlantById(req, res);
});
planteRouter.post("/", (req, res) => {
  planteController.createNewPlant(req, res);
});
planteRouter.put("/:id", (req, res) => {
  planteController.updateOnePlant(req, res);
});
planteRouter.delete("/:id", (req, res) => {
  planteController.deleteOnePlant(req, res);
});

export default planteRouter;
/**-----------------------------------------------------------------------------------------------*/
