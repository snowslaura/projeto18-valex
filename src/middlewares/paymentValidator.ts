import { NextFunction, Request, Response } from "express";
import paymentSchema from "./../schemas/paymentSchema.js";

export async function paymentDataValidator(req : Request,res: Response, next: NextFunction){
    const {error} = paymentSchema.validate(req.body, { abortEarly: false})
    if (error){
        return res.status(422).send(error.details)
    }
    res.locals.paymentData= req.body
    next();
}