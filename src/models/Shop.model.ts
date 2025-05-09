import mongoose, { Types } from "mongoose";

interface shop {
  name: string;
  contact: string;
  ownername:string,
  city:Types.ObjectId,
  area:Types.ObjectId,
  createdAt:Date,
  updatedAt:Date
}

const ShopSchema = new mongoose.Schema<shop>(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    ownername: {
      type: String,
      required: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
      required: true,
    },
  },
  { timestamps: true }
);

export const Shop = mongoose.model<shop>("Shop", ShopSchema);
