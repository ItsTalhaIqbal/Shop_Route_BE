import { Request, Response } from "express";
import { Product } from "../models/Product.model";
import { Types } from "mongoose";

interface product {
  name: number;
  price: number;
  category: Types.ObjectId;
  images: string[];
  subcategory: string;
}

export const CreateProduct = async (req: Request, res: Response) => {
  const { name, price, category, images, subcategory }: product = req.body;
  try {
    const exixtingProducts = await Product.find();
    const matchData = exixtingProducts.find(
      (product: any) =>
        product.name == name &&
        product.category == category &&
        product.subcategory == subcategory
    );
    if (matchData) {
      res.status(400).send({ message: "Same City name Already Exist." });
      return;
    }
    const response = await Product.create({
      name,
      price,
      category,
      images,
      subcategory,
    });
    res.status(200).send({ message: "Successfully created Product", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to create Product", error });
  }
};

export const UpdateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, price, category, images, subcategory }: product = req.body;
  const { id } = req.params;

  if (!id) {
    res.status(400).send({ message: " Product ID is not defined" });
  }

  try {
    const exixtingProducts = await Product.find();
    const matchData = exixtingProducts.find(
      (product: any) =>
        product.name == name &&
        product.category == category &&
        product.subcategory == subcategory &&
        product._id.toString() !== id
    );
    if (matchData) {
      res.status(400).send({ message: "Same Product data Already Exist." });
      return;
    }

    const response = await Product.findByIdAndUpdate(
      id,
      { name, price, category, images, subcategory },
      { new: true }
    );

    res.status(200).send({ message: "Successfully updated Product", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to update Product", error });
  }
};

export const DeleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({ message: " Product ID is not defined" });
  }

  try {
    const response = await Product.findByIdAndDelete(id);
    res.status(200).send({ message: "Successfully deleted Product", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete Product", error });
  }
};

export const GetAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await Product.find();
    res
      .status(200)
      .send({ message: "Successfully retrieved Products", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve Products", error });
  }
};

export const GetProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: " Product ID is not defined" });
  }
  try {
    const response = await Product.findById(id);
    res
      .status(200)
      .send({ message: "Successfully retrieved Product", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve Product", error });
  }
};
