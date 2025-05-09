import { orderValidationSchema } from "./Order.Validation";


 const validateOrder = (req:any, res:any, next:any):void => {
  const { error } = orderValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: "Data is not valid", details: error.details });
  }
  next();
};

  export  {validateOrder}
