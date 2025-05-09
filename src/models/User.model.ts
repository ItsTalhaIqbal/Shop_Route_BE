import mongoose from "mongoose";

 interface user {
  username: string;
  email: string;
  password: string;
  role: "admin" | "salesman";
  resetCode: string | null;
  resetCodeExpiry: Date | null;
  createdAt:Date,
  updatedAt:Date
}

const UserSchema = new mongoose.Schema<user>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "salesman",
      enum: ["admin", "salesman"],
    },
    resetCode: {
      type: String,
      default: null,
    },
    resetCodeExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);




export const User = mongoose.model<user>("User", UserSchema);

