import { categoryValidation } from "./Category.Validation";

 const ValidateCategory = (req:any, res:any, next:any): void => {
  const { error } = categoryValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: "Data is not valid", details: error.details });
  }
  next();
};

   export {ValidateCategory}
