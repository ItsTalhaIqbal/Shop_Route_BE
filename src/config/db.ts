
import mongoose from 'mongoose'
export const ConnectDB = async () => {
  try {
    // const uri = process.env.MONGO_URI;
    const uri = "mongodb://localhost:27017/"
    if (!uri) {
      console.log("MongoDB URI Not Defined");
      return;
    }
    await mongoose.connect(uri);
    console.log("Mongo DB connected successfully");
  } catch (error) {
    console.log("DB connection error", error);
  }
};

