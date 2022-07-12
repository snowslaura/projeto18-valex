import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/index.js";
import errorHandlingMiddleware from "./middlewares/errorHandler.js";
var app = express();
app.use(json());
app.use(router);
app.use(errorHandlingMiddleware);
var port = +process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
