import { NextFunction, Request, Response } from "express";
import { LoginValidation } from "./Login.Validation";

const LoginMiddleware = (req: Request, res: Response,next:NextFunction): void => {
  const { error } = LoginValidation.validate(req.body, { abortEarly: false });

  if (error) {
     res
      .status(400)
      .json({ message: "Data is nor valid", Details: error.details });
      return
  }
  next()
};

export {LoginMiddleware}