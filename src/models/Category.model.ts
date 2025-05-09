import mongoose from "mongoose";

interface category{
  name : string,
  subcategories : string[],
  createdAt:Date,
  updatedAt:Date
}

const CategorySchema = new mongoose.Schema<category>({
  name: {
    type: String,
    required: true,
  },
  subcategories:{
    type:[String],
    default:[]
  }
},{timestamps:true}
);


export const Category = mongoose.model<category>("Category", CategorySchema);
