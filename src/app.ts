import dotenv from "dotenv";
import "express-async-errors";
import express from "express";

import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import connectDB from "./db/connect";
import products from "./routes/products";


dotenv.config();
const app = express();

// middleware
app.use(express.json());


// routes
app.use("/api/v1/products", products);


// errors
app.use(notFound);
app.use(errorHandlerMiddleware);


// start server
const port = process.env.PORT || 8000;
(async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await connectDB(mongoURI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
})();
