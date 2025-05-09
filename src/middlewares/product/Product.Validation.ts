import Joi from 'joi';

const productValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().regex(/^[a-f\d]{24}$/i).required(), 
  images: Joi.array().items(Joi.string().uri()).optional(), 
  subcategory: Joi.string().optional()
});

export { productValidationSchema };
