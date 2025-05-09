import Joi from "joi";

 const registerValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role:Joi.string().default("salesman")
  });
  
  export {registerValidation}