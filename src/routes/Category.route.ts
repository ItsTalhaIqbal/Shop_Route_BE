
import { Router } from "express";
import { CreateCategory, DeleteCategory, GetAllCategories, GetCategory, UpdateCategory } from "../controllers/Category.controller";

const CategoryRoute = Router();

CategoryRoute.get("/:id", GetCategory);
CategoryRoute.get("/", GetAllCategories );
CategoryRoute.post("/", CreateCategory);
CategoryRoute.put("/:id", UpdateCategory);
CategoryRoute.delete("/:id", DeleteCategory);

export {CategoryRoute};

