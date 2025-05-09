import mongoose from "mongoose";

interface city{
  name:string,
  createdAt:Date,
  updatedAt:Date
}

const CitySchema = new mongoose.Schema<city>({
  name: {
    type: String,
    required: true,
  }
},{timestamps:true});

export const City = mongoose.model<city>("City", CitySchema);
