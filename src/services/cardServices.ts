import {findById} from "./../repositories/employeeRepository.js"
import {findByTypeAndEmployeeId,TransactionTypes,CardInsertData} from "./../repositories/cardRepository.js"
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import Cryptr from "cryptr"



export async function createCard(type:TransactionTypes,idEmployee:number,key:string){    
  await checkEmployee(idEmployee);
  await checkEmployeeTypes(type,idEmployee);
  const CardData = await setCardData(idEmployee,type);
  //await InsertCard(CardData);
}

async function checkEmployee(idEmployee: number){
  const employeeExists = await findById(idEmployee)
  if(!employeeExists) throw {
  type:"not_found",
  message:"Employee not found"  
  }     
}

async function checkEmployeeTypes(type:TransactionTypes, idEmployee:number){
  const typeEmployeeExists = await findByTypeAndEmployeeId(type,idEmployee)
  if(typeEmployeeExists)throw {
  type:"not_found",
  message:"Type already exists"  
  } 
}  

async function setCardData(idEmployee: number, type:TransactionTypes){
  const number = setCardNumber();
  const employeeId = idEmployee;  
  const cardholderName = await setCardHolderName(idEmployee)
  const securityCode = setSecurityCode();
  const expirationDate = setExpirationDate();
  const password : string = null;
  const isVirtual = false;
  const originalCardId : number = null;
  const isBlocked = true; 
  

  const cardData  = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type,
  }
  return cardData as CardInsertData
}

function setCardNumber(){
  return faker.finance.creditCardNumber()
}

async function setCardHolderName(idEmployee:number){
  const employeeData = await findById(idEmployee)
  const employeeName = employeeData.fullName
  const employeeNameArray = employeeName.split('')
  const length = employeeNameArray.length
  const firstName = employeeNameArray.at(0)
  const lastName = employeeNameArray.at(length-1)
  const middleNames = employeeNameArray.slice(1,length-1)
  const middleNamesfirstLetters = middleNames.map((name)=>{
    if(name.length>2){
      return name.at(0)
    } 
  })
  const middleNamefirstLettersString = middleNamesfirstLetters.join(" ").toString()
  return `${firstName.toUpperCase()} ${middleNamefirstLettersString.toUpperCase()} ${lastName.toUpperCase()}`
  
}

function setSecurityCode(){
  const CVV =  faker.random.numeric(3)
  const cryptr = new Cryptr('myTotallySecretKey');
  return cryptr.encrypt(CVV);
  // const decryptedString = cryptr.decrypt(encryptedString);
}

function setExpirationDate(){
  const today = dayjs().locale('pt-br').format('MM/YY')
  return dayjs(today).add(5,'years').add(1,'month').toString()

}




