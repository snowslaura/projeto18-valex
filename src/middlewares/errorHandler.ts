import { NextFunction, Request, Response } from "express";

export default function errorHandlingMiddleware(error,req: Request, res : Response, next: NextFunction){
   console.log(error);
   if(error.type==="not_found") return res.status(404).send(error.message)
   if(error.type==="forbidden") return res.status(403).send(error.message)
   if(error.type==="unauthorized") return res.status(401).send(error.message)
   res.sendStatus(500)
}