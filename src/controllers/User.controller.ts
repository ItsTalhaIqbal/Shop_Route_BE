import { Request, Response } from "express";
import { User } from "../models/User.model";

export const CreateUser = async (req:Request, res:Response): Promise<void> => {
  const data = req.body;
  try {
    const response = await User.create(data);
    res.status(200).send({ message: "Successfully created User", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to create User", error });
  }
};

export const UpdateUser = async (req:Request, res:Response): Promise<void> => {
  const data = req.body;
  const { id } = req.params;
  try {
    const response = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(200).send({ message: "Successfully updated User", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to update User", error });
  }
};

export const DeleteUser = async (req:Request, res:Response): Promise<void> => {
  const { id } = req.params;
  try {
    const response = await User.findByIdAndDelete(id);
    res.status(200).send({ message: "Successfully deleted User", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete User", error });
  }
};

export const GetAllUser = async (req:Request, res:Response): Promise<void> => {
  try {
    const response = await User.find();
    res.status(200).send({ message: "Successfully retrieved Shops", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve Shops", error });
  }
};

export const GetUser = async (req:Request, res:Response): Promise<void> => {
  const { id } = req.params;
  try {
    const response = await User.findById(id);
    res.status(200).send({ message: "Successfully retrieved User", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve User", error });
  }
};


