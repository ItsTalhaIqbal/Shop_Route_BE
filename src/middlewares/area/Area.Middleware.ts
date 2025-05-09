import { NextFunction, Request, Response } from "express";
import { areaValidation } from "./Area.validation";

 const ValidateArea = (req:Request, res:Response, next:NextFunction):any => {
  const { error } = areaValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: "Data is not valid", details: error.details });
  }
  next();
};

   export {ValidateArea}
