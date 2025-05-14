import { Types } from "mongoose";
import mongoose from "mongoose";

type IOrder = {
  user: Types.ObjectId;
  city: Types.ObjectId;
  area: Types.ObjectId;
  shop: Types.ObjectId;
  items: [{ product_id: Types.ObjectId; quantity: number }];
  paymentMethod:string,
  price:number,
  status:string
};

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
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
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          max: 5,
        },
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["cod", "card"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "processing", "shipped", "canceled"],
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
