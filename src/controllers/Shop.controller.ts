import { Request, Response } from "express";
import { Shop } from "../models/Shop.model";

export const CreateShop = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;
  try {
    const exixtingShops = await Shop.find();
    const matchData = exixtingShops.find(
      (shop) =>
        shop.name === data.name &&
        shop.city === data.city &&
        shop.area === data.area
    );
    if (matchData) {
      res.status(400).send({ message: "Same Shop Data Already Exist." });
      return;
    }
    const response = await Shop.create(data);
    res.status(200).send({ message: "Successfully created Shop", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to create Shop", error });
  }
};

export const UpdateShop = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: "Shop Id is not defined ." });
  }
  try {
     const exixtingShops = await Shop.find();
    const matchData = exixtingShops.find(
      (shop) =>
        shop.name === data.name &&
        shop.city === data.city &&
        shop.area === data.area &&
        shop._id.toString() !== id
    );
    if (matchData) {
      res.status(400).send({ message: "Same Shop Data Already Exist." });
      return;
    }
    const response = await Shop.findByIdAndUpdate(id, data, { new: true });
    res.status(200).send({ message: "Successfully updated Shop", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to update Shop", error });
  }
};

export const DeleteShop = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: "Shop Id is not defined ." });
  }
  try {
    const response = await Shop.findByIdAndDelete(id);
    res.status(200).send({ message: "Successfully deleted Shop", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete Shop", error });
  }
};

export const GetAllShops = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await Shop.find();
    res.status(200).send({ message: "Successfully retrieved Shops", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve Shops", error });
  }
};

export const GetShop = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: "Shop Id is not defined ." });
  }
  try {
    const response = await Shop.findById(id);
    res.status(200).send({ message: "Successfully retrieved Shop", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve Shop", error });
  }
};
