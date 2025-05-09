import { NextFunction, Request, Response } from "express";
import { shopValidationSchema } from "./Shop.Validation";

const validateShop = (req: Request, res: Response, next: NextFunction):any => {
  const { error } = shopValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res
      .status(400)
      .json({ message: "Data is not valid", details: error.details });
  }

  next();
};

export { validateShop };
