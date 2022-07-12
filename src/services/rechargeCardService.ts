import {findById} from "./../repositories/cardRepository.js"
import {insert} from "./../repositories/rechargeRepository.js"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat)

export async function rechargeCard(id:number,amount:number){
    const cardData = await isCardRegistered(id)
    isCardBlocked(cardData)
    isCardActive(cardData)
    isCardExpired(cardData)
    updateRechargeCard(id,amount)
}

async function isCardRegistered(id:number){
    const cardData = await findById(id)
    if(!cardData)throw{
        type:"unprocessable_entity",
        message:"Card doens't exists"  
    }
    return cardData
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


async function updateRechargeCard(cardId:number, amount:number){
    await insert({cardId,amount})
}