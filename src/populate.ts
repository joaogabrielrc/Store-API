import dotenv from "dotenv";

import connectDB from "./db/connect";
import Product from "./models/Product";
import jsonProducts from "./products.json";


dotenv.config();

const port = process.env.PORT || 8000;
(async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await connectDB(mongoURI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Success");
    
  } catch (error) {
    console.log(error);
  }
})();

