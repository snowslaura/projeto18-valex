import {findById} from "./../repositories/cardRepository.js"
import {findByApiKey} from "./../repositories/companyRepository.js"
import {findById as findEmployeeById}  from "./../repositories/employeeRepository.js"
import {insert} from "./../repositories/rechargeRepository.js"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat)

export async function rechargeCard(id:number,amount:number,APIKey:string){
    const cardData = await isCardRegistered(id)
    await isCompanyAllowed(APIKey,cardData)
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

async function isCompanyAllowed(APIKey:string,cardData:any){
    const company = await findByApiKey(APIKey)
    const employee = await findEmployeeById(cardData.employeeId)
    if(company.id!==employee.companyId)throw{
        type:"unauthorized",
        message:"Company not allowed"  
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


async function updateRechargeCard(cardId:number, amount:number){
    await insert({cardId,amount})
}