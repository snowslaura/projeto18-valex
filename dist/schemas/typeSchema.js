import joi from "joi";
var typeSchema = joi.string().required().valid('groceries', 'restaurant', 'transport', 'education', 'health');
export default typeSchema;
