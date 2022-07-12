import {findById, update} from "./../repositories/cardRepository.js"
import bcrypt from "bcrypt"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat)

export async function unblockCard(id:number,password:string){
    const cardData = await findById(id)
    isCardBlocked(cardData)
    isCardExpired(cardData)
    await checkPassword(id,password,cardData)
    updateIsblockedCard(id)
}


async function checkPassword(id:number,password:string,cardData:any){
    const {password:hashPassword} = cardData
    const match = await bcrypt.compare(password,hashPassword)
    if(!match)throw{
        type:"unauthorized",
        message:"An error occurred"  
    }
}

function isCardBlocked(cardData:any){
    const {isBlocked} = cardData
    if(!isBlocked) throw{
        type:"unauthorized",
        message:"Card is already unblocked"  
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

async function updateIsblockedCard(id:number){
    await update(id,{isBlocked:false})
}