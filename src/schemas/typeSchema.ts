import joi from "joi";

const typeSchema = joi.string().required().valid('groceries', 'restaurant', 'transport', 'education', 'health')

export default typeSchema;