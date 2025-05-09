import { Router } from "express";
import { CreateShop, DeleteShop, GetAllShops, GetShop, UpdateShop } from "../controllers/Shop.controller";

const ShopRoute = Router();

ShopRoute.get('/:id', GetShop);
ShopRoute.get('', GetAllShops);
ShopRoute.post('', CreateShop);
ShopRoute.put('/:id', UpdateShop);
ShopRoute.delete('/:id', DeleteShop);

  
export {ShopRoute} ;