import Joi from "joi";

const orderValidationSchema = Joi.object({
  user: Joi.string().trim().required(),
  city: Joi.string().trim().required(),    
  area: Joi.string().trim().required(),    
  shop: Joi.string().trim().required(),    
  items: Joi.array().min(1).required(),
  paymentMethod: Joi.string()
    .valid("cod", "card") 
    .required(),
    price:Joi.number().required(),
    status:Joi.string().default("pending").required()
});

export { orderValidationSchema };
