import { Router } from "express";
import { upload } from "../config/multerConfig";
import { uploadFile, deleteFile } from "../controllers/File.controller";

const FileRoute = Router();

FileRoute.post("/", upload.array("images", 5), uploadFile);

FileRoute.delete("/:filename", deleteFile);

export { FileRoute };
