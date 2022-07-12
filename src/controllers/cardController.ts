import {Request, Response} from "express"
import * as cardServices from "../services/createCardServices.js"
import * as activateCardService from "../services/activateCardService.js"
import * as getBalanceCardService from "../services/getBalanceCardService.js"
import * as blockCardService from "../services/blockCardService.js"
import * as unblockCardService from "../services/unblockCardService.js"



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

export async function getBalance(req:Request,res: Response){
    const id = parseInt(req.params.id)
    const balance = await getBalanceCardService.getBalance(id)
    res.status(200).send(balance)
}

export async function blockCard(req:Request,res: Response){
    const id = parseInt(req.params.id)
    const {password} = req.body
    await blockCardService.blockCard(id,password)
    res.sendStatus(200)
}

export async function unblockCard(req:Request,res: Response){
    const id = parseInt(req.params.id)
    const {password} = req.body
    await unblockCardService.unblockCard(id,password)
    res.sendStatus(200)
}