import { Order } from "../models/Order.model";

export const CreateOrder = async (req:any, res:any) => {
  const data = req.body;

  try {
    const response = await Order.create(data);
    res.status(200).send({ message: "Order Created Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to create Order", error });
  }
};

export const UpdateOrder = async (req:any, res:any) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const response = await Order.findByIdAndUpdate(id, data, { new: true });
    res.status(200).send({ message: "Order Updated Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to Update Order", error });
  }
};

export const DeleteOrder = async (req:any, res:any) => {
  const { id } = req.params;

  try {
    const response = await Order.findByIdAndDelete(id);
    res.status(200).send({ message: "Order Deleted Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to Delete Order", error });
  }
};

export const GetAllOrders = async (req:any, res:any) => {
  try {
    const response = await Order.find();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ message: "Failed to Find Orders", error });
  }
};

export const GetOrder = async (req:any, res:any) => {
  const { id } = req.params;

  try {
    const response = await Order.findById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ message: "Failed to Find Order", error });
  }
};

