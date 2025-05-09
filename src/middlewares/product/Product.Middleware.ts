import { NextFunction, Request, Response } from "express";
import { productValidationSchema } from "./Product.Validation";

const validateProduct = (req:Request, res:Response, next:NextFunction):any => {
  
  const { error } = productValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(400)
      .json({ message: "Data is not valid", details: error.details });
  }
  next();
};

export {validateProduct};
