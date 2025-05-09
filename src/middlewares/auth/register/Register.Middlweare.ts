import { NextFunction, Request, Response } from "express";
import { registerValidation } from "./Register.Validation";

const RegisterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = registerValidation.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
     res
      .status(400)
      .json({ message: "Data is not valid", Details: error.details });
      return;
  }
  next();
};

export { RegisterMiddleware };
