import { NextFunction, Request, Response } from "express";
import activationDataSchema from "./../schemas/activationDataSchema.js";

export async function activationDataValidator(req : Request,res: Response, next: NextFunction){
    const {error} = activationDataSchema.validate(req.body, { abortEarly: false})
    if (error){
        return res.status(422).send(error.details)
    }
    res.locals.activationData = req.body
    next();
}