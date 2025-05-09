import { Router } from "express";
import {  CreateCity, DeleteCity, GetAllCities, GetCity, UpdateCity } from "../controllers/City.controller";

const CityRoute = Router();

CityRoute.get("/:id", GetCity);
CityRoute.get("/", GetAllCities);
CityRoute.post("/", CreateCity);
CityRoute.put("/:id", UpdateCity);
CityRoute.delete("/:id", DeleteCity);

export {CityRoute};

