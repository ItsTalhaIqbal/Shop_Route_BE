import { Router } from "express";
import { CreateArea, DeleteArea, GetAllAreas, GetArea, UpdateArea } from "../controllers/Area.controller";

const AreaRoute = Router();

AreaRoute.get("/:id", GetArea);
AreaRoute.get("/", GetAllAreas);
AreaRoute.post("/", CreateArea);
AreaRoute.put("/:id", UpdateArea);
AreaRoute.delete("/:id", DeleteArea);

export {AreaRoute};

