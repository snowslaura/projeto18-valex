import { Router } from "express"
import { createCard, activateCard } from "../controllers/cardController.js";
import { typeValidator } from "../middlewares/typeValidator.js";
import { idValidator } from "../middlewares/idValidator.js";
import { ApiKeyValidator } from "../middlewares/ApiKeyValidator.js";
import {activationDataValidator} from "../middlewares/activationDataMIddleware.js"

const cardRouter = Router();

cardRouter.post("/card/create", ApiKeyValidator, idValidator, typeValidator, createCard )
cardRouter.post("/card/activate",activationDataValidator, activateCard )

export default cardRouter;