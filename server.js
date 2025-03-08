import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import dogRoutes from './routes/dog.js';
import interactRoutes from './routes/interaction.js';

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/interactions', interactRoutes);

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
