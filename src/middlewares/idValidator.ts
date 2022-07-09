import { NextFunction, Request, Response } from "express";
import idSchema from "./../schemas/idSchema.js";

export async function idValidator(req : Request,res: Response, next: NextFunction){
    const {error} = idSchema.validate(req.body.id, { abortEarly: false})
    if (error){
        return res.status(422).send(error.details)
    }
    res.locals.id = req.body.id
    next();
}