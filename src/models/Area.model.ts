import mongoose, { model, Types } from "mongoose";
import { City } from "./City.model";


interface area{
  name:string,
  city:Types.ObjectId,
  createdAt:Date,
  updatedAt:Date
}

const AreaSchema = new mongoose.Schema<area>({
  name: {
    type: String,
    required: true,
  },
  city:{
    type:mongoose.Schema.Types.ObjectId,
    ref:City,
    required:true
  }
});


export const Area = model<area>("Area",AreaSchema)