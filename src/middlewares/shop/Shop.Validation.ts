import Joi from "joi";

const shopValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  contact: Joi.string()
    .regex(/03[0-9]{2}[0-9]{7}/)
    .required(),
  city: Joi.string().trim().required(),
  area: Joi.string().trim().required(),
  ownername: Joi.string().trim().required(),

});

export { shopValidationSchema };
