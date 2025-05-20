import Joi from "joi";

const authValidateSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});
export default authValidateSchema;