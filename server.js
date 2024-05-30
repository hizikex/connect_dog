import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("MongooseDB connected");
    app.listen(process.env.PORT, () => {
      console.log("App listening on " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
