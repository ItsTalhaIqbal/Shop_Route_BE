import Joi from "joi";


const cityValidationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required(),

});

export { cityValidationSchema };
