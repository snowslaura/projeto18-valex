import { NextFunction, Request, Response } from "express";

export default function errorHandlingMiddleware(error,req: Request, res : Response, next: NextFunction){
   console.log(error);
   if(error.type==="not_found") return res.status(404).send(error.message)
   res.sendStatus(500)
}