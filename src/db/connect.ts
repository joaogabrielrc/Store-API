import mongoose, { } from "mongoose";


const connectDB = (url: string | undefined) => {
  if (typeof url !== "string")
    throw new Error("Undefined URL.");
  mongoose.connect(url);  
};

export default connectDB;