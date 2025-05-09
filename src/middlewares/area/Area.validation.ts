import Joi from "joi";

const areaValidation = Joi.object({
    name:Joi.string().trim().required(),
    city:Joi.string().trim().required(),
})

export {areaValidation}