import Joi from "joi";

 const LoginValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  export {LoginValidation}