import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat)
import {findByCardDetails,update} from "./../repositories/cardRepository.js"
import Cryptr from "cryptr"
import bcrypt from "bcrypt"

export async function activateCard(cardholderName:string,number:string,expirationDate:string, CVC:string, password:string){
    const card:any = await checkCard(number,cardholderName,expirationDate)
    checkExpirationDate(card.expirationDate)
    checkPassword(card.password)
    checkCVC(card.securityCode,CVC)
    await insertPassword(card.id,password)
}

async function checkCard(number: string, cardholderName:string,expirationDate:string){
    const card = await findByCardDetails(number,cardholderName,expirationDate)
    if(!card)throw {
    type:"forbidden",
    message:"An error ocurred"  
    }    
    return card
}

function checkExpirationDate(cardExpirationDate:string){  
    const isExpirationDayAhead = dayjs(cardExpirationDate,'MM/YY').isAfter(dayjs(Date.now()))
    if(!isExpirationDayAhead) throw {
    type:"forbidden",
    message:"Card expired"  
    }   
}

function checkPassword(password:any){
    if(password)throw {
        type:"forbidden",
        message:"This card has already been activated "  
    }  
}

function checkCVC(securityCode:string,CVC:string){
    const cryptr = new Cryptr('myTotallySecretKey');
    const decryptedSecurityCode = cryptr.decrypt(securityCode);
    if(decryptedSecurityCode!==CVC)throw{
        type:"forbidden",
        message:"An error ocurred"
    }
}

async function insertPassword(id:number,givenPassword:string){
    const hashPassword = await( bcrypt.hash(givenPassword,parseInt(process.env.SALT)))
    await update(id,{password:hashPassword,isBlocked:false})
}
