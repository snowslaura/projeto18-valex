import { Router } from "express"
import { createCard, activateCard, getBalance, blockCard, unblockCard, rechargeCard, paymentCard } from "../controllers/cardController.js";
import { typeValidator } from "../middlewares/typeValidator.js";
import { idValidator } from "../middlewares/idValidator.js";
import { ApiKeyValidator } from "../middlewares/ApiKeyValidator.js";
import { activationDataValidator } from "../middlewares/activationDataMIddleware.js"
import { amountValidator } from "../middlewares/amountValidator.js"
import { paymentDataValidator } from "../middlewares/paymentValidator.js";

const cardRouter = Router();

cardRouter.post("/card/create", ApiKeyValidator, idValidator, typeValidator, createCard )
cardRouter.post("/card/activate",activationDataValidator, activateCard )
cardRouter.get("/card/balance/:id", getBalance)
cardRouter.post("/card/block/:id", blockCard)
cardRouter.post("/card/unblock/:id", unblockCard)
cardRouter.post("/card/recharge/:id", ApiKeyValidator, amountValidator, rechargeCard)
cardRouter.post("/card/payment/:id", ApiKeyValidator, paymentDataValidator, paymentCard)

export default cardRouter;