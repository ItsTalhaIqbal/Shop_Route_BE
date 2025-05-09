import Joi from "joi";

const categoryValidation = Joi.object({
  name: Joi.string().trim().required(),
  subcategories: Joi.array().items(Joi.string().trim()).default([])
});

export { categoryValidation };
