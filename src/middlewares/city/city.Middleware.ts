import { NextFunction, Request, Response } from "express";
import {  cityValidationSchema } from "./city.Validation";

 const ValidateCity = (req:Request, res:Response, next:NextFunction):any => {
  const { error } = cityValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: "Data is not valid", details: error.details });
  }
  next();
};

   export {ValidateCity}
