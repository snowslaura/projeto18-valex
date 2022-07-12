import joi from "joi";
var activationDataSchema = joi.object({
    number: joi.string().min(13).max(13).required(),
    cardholderName: joi.string().required(),
    expirationDate: joi.string().required(),
    CVC: joi.string().min(3).max(3).required(),
    password: joi.string().min(4).max(4).required()
});
export default activationDataSchema;
