import { Router } from "express";
import { CreateProduct, DeleteProduct, GetAllProducts, GetProduct, UpdateProduct } from "../controllers/Product.controller";

const ProductRoute = Router();

ProductRoute.get("/:id", GetProduct);
ProductRoute.get("/", GetAllProducts);
ProductRoute.post("/", CreateProduct);
ProductRoute.put("/:id", UpdateProduct);
ProductRoute.delete("/:id", DeleteProduct);

export {ProductRoute}