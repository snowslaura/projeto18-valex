import joi from "joi";

const amountSchema = joi.number().integer().min(1).required()

export default amountSchema;