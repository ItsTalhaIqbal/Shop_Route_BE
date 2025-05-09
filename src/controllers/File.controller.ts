import { Request, Response } from "express";
import fs from "fs";
import path from "path";



const uploadDirectory = path.join(__dirname, "../../uploads");

export const uploadFile = (req: Request, res: Response): void => {
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
  }
  if (req.files) {
    const filePaths = (req.files as Express.Multer.File[]).map((file) =>
      `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );
    res.json({ success: true, filePaths });
    return;
  }

  res.status(400).json({ success: false, message: "No files uploaded" });
};


export const deleteFile = (req: Request, res: Response): void => {
  const { filename } = req.params;

  const filePath = path.join(__dirname, "../../uploads/", filename);


  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "File not found or already deleted" });
    }

    res.json({ success: true, message: "File deleted successfully" });
  });
};
