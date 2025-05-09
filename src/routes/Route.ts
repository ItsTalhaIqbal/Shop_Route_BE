import { Router } from "express";
import {  CityRoute } from "./City.route";
import { OrderRoute } from "./Order.route";
import { ProductRoute } from "./Product.route";
import { ShopRoute } from "./Shop.route";
import { AuthRoute } from "./Auth.route";
import { UserRoute } from "./User.route";
import { CategoryRoute } from "./Category.route";
import { FileRoute } from "./File.route";
import { AreaRoute } from "./Area.route";


import { ValidateCity } from "../middlewares/city/city.Middleware";
import { validateOrder } from "../middlewares/order/Order.Middleware";
import { validateProduct } from "../middlewares/product/Product.Middleware";
import { validateShop } from "../middlewares/shop/Shop.Middleware";
import { ValidateCategory } from "../middlewares/category/Category.Middleware";
import { ResetRoute } from "./ResetPass.route";
import { ValidateArea } from "../middlewares/area/Area.Middleware";




const router = Router();

router.use('/auth', AuthRoute);
router.use('/reset', ResetRoute);
router.use('/city', ValidateCity, CityRoute);
router.use('/area',ValidateArea, AreaRoute);
router.use('/order', validateOrder, OrderRoute); 
router.use('/product', validateProduct, ProductRoute);
router.use('/shop', validateShop, ShopRoute);
router.use('/category', ValidateCategory, CategoryRoute);
router.use('/user',UserRoute)
router.use('/upload',FileRoute)


export {router}