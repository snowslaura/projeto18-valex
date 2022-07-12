import {findById} from "./../repositories/cardRepository.js"
import { findBusinessById} from "../repositories/businessRepository.js"
import bcrypt from "bcrypt"
import {insert} from "./../repositories/paymentRepository.js"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import {getBalance} from "./../services/getBalanceCardService.js"
dayjs.extend(customParseFormat)

export async function paymentCard(id:number,password:string,businessId:number,amount:number){
    const cardData = await isCardRegistered(id)
    const businessData = await isBusinessRegistered(businessId)
    isTypeMatching(businessData,cardData)
    await checkPassword(password,cardData)
    isCardBlocked(cardData)
    isCardActive(cardData)
    isCardExpired(cardData)
    const {balance} = await getBalance(id)
    isThereEnoughBalance(balance,amount)
    updatePaymentCard(id,businessId,amount)
}

async function isCardRegistered(id:number){
    const cardData = await findById(id)
    if(!cardData)throw{
        type:"unprocessable_entity",
        message:"Card doens't exists"  
    }
    return cardData
}

async function isBusinessRegistered(id:number){
    const businessData = await findBusinessById(id)
    if(!businessData)throw{
        type:"unprocessable_entity",
        message:"Business does not exists"  
    }
    return businessData
}

function isTypeMatching(businessData:any,cardData:any){
    if(businessData.type!==cardData.type)throw{
        type:"unprocessable_entity",
        message:"The type does not match"  
    }
}

async function checkPassword(password:string,cardData:any){
    const {password:hashPassword} = cardData    
    const match = await bcrypt.compare(password,hashPassword)
    if(!match)throw{
        type:"unauthorized",
        message:"An error occurred"  
    }
}

function isCardBlocked(cardData:any){
    const {isBlocked} = cardData
    if(isBlocked) throw{
        type:"unauthorized",
        message:"Card is blocked"  
    }
}

function isCardActive(cardData:any){
    const {password} = cardData
    if(!password) throw{
        type:"forbidden",
        message:"Card is not active"  
    }
}

function isCardExpired(cardData:any){
    const {expirationDate} = cardData
    const isExpirationDayAhead = dayjs(expirationDate,'MM/YY').isAfter(dayjs(Date.now()))
    if(!isExpirationDayAhead) throw {
        type:"forbidden",
        message:"Card expired"  
    }
}

function isThereEnoughBalance(balance:number, amount:number){
    if(balance<amount)throw{
        type:"forbidden",
        message:"Not enough balance"  
    }
}

async function updatePaymentCard(cardId:number,businessId:number, amount:number){
    await insert({cardId,businessId,amount})
}