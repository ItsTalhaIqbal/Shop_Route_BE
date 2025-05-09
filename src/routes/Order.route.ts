import { Router } from "express";
import { CreateOrder, DeleteOrder, GetAllOrders, GetOrder, UpdateOrder } from "../controllers/Order.controller";

const OrderRoute = Router();

OrderRoute.get("/:id", GetOrder);
OrderRoute.get("", GetAllOrders);
OrderRoute.post("", CreateOrder);
OrderRoute.put("/:id", UpdateOrder);
OrderRoute.delete("/:id", DeleteOrder);

export {OrderRoute};
