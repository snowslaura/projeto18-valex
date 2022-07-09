import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import router from "./routes/index.js";
import errorHandlingMiddleware from "./middlewares/errorHandler.js";


const app = express();
app.use(json());
app.use(router);
app.use(errorHandlingMiddleware);

const port = +process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});
