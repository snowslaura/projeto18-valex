import { NextFunction, Request, Response } from "express";
import amountSchema from "../schemas/amountSchema.js";

export async function amountValidator(req : Request,res: Response, next: NextFunction){
    const {error} = amountSchema.validate(req.body.amount, { abortEarly: false})
    if (error){
        return res.status(422).send(error.details)
    }
    res.locals.amount = req.body.amount
    next();
}