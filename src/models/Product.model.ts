import mongoose, { Types } from "mongoose";
import { Category } from "./Category.model";

 interface product{
  name:string,
  price:number,
  category:Types.ObjectId,
  images:string[],
  subcategory:string,
  createdAt?:Date,
  updatedAt?:Date
}

const ProductSchema = new mongoose.Schema<product>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    images: {
      type: [String], 
      required: false, 
    },
    subcategory:{
      type:String
    }
  },
  { timestamps: true }
);

export const Product  = mongoose.model<product>("Product", ProductSchema);
