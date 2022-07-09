import { NextFunction, Request, Response } from "express";
import typeSchema from "./../schemas/typeSchema.js";

export async function typeValidator(req : Request,res: Response, next: NextFunction){
    const {error} = typeSchema.validate(req.body.type, { abortEarly: false})
    if (error){
        return res.status(422).send(error.details)
    }
    res.locals.type = req.body.type
    next();
}