import joi from "joi";
var amountSchema = joi.number().integer().min(1).required();
export default amountSchema;
