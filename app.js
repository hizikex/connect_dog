import express from "express";
import userRoutes from "./routes/user.js";
import dogRoutes from './routes/dog.js'

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to dog connect platform");
  });

app.use("/api/users", userRoutes);
app.use('/api/dogs', dogRoutes);

export default app;