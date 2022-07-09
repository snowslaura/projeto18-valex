import { Router } from "express"
import { createCard } from "../controllers/cardController.js";
import { typeValidator } from "../middlewares/typeValidator.js";
import { idValidator } from "../middlewares/idValidator.js";
import { ApiKeyValidator } from "../middlewares/ApiKeyValidator.js";

const cardRouter = Router();

cardRouter.post("/card/create", ApiKeyValidator, idValidator, typeValidator, createCard )

export default cardRouter;