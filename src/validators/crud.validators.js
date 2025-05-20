import Joi from "joi";

const crudSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    stock: Joi.number().min(0).default(0).required()
});
export default crudSchema;