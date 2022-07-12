import joi from "joi";

const paymentSchema = joi.object({
    amount: joi.number().min(1).required(),   
    businessId:joi.number().min(1).required(),
    password:joi.string().min(4).max(4).required()
})

export default paymentSchema;