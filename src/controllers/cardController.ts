import {Request, Response} from "express"
import * as cardServices from "../services/cardServices.js"
import * as activateCardService from "../services/activateCardService.js"



export async function createCard(req:Request,res: Response){   
    const {type, id} = res.locals    
    await cardServices.createCard(type,id)
    res.sendStatus(200)    
}

export async function activateCard(req:Request,res: Response){   
    const {cardholderName,number,expirationDate, CVC, password} = res.locals.activationData 
    await activateCardService.activateCard(cardholderName,number,expirationDate, CVC, password)
    res.sendStatus(200)    
}