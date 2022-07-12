import { Router } from "express";
import cardRouter from "./cardRouter.js";
var router = Router();
router.use(cardRouter);
export default router;
