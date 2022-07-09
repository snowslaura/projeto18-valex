import {Request, Response} from "express"
import * as cardServices from "../services/cardServices.js"


export async function createCard(req:Request,res: Response){   
    const {type, id, APIKey} = res.locals    
    await cardServices.createCard(type,id,APIKey)
    res.sendStatus(200)    
}