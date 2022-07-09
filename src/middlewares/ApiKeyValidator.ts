import { NextFunction, Request, Response } from "express";
import ApiKeySchema from "./../schemas/APIKeySchema.js"
import {findByApiKey} from "./../repositories/companyRepository.js"

export async function ApiKeyValidator(req : Request,res: Response, next: NextFunction){
    const ApiKey = req.headers["x-api-key"].toString()
    const {error} = ApiKeySchema.validate(ApiKey, { abortEarly: false})
    if(error){
        return res.status(422).send(error.details)
    }    
    const companyExists = await findByApiKey(ApiKey)
    if(!companyExists) throw {      
        type:"not_found",
        message:"Problem with APIkey"  
    }
    res.locals.APIKey = ApiKey
    next();
}

