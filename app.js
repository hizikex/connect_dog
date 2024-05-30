import express from "express";
import userRoutes from "./routes/user.js";
import dogRoutes from './routes/dog.js';
import interactRoutes from './routes/interaction.js';

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to dog connect platform");
  });

app.use("/api/users", userRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/interactions', interactRoutes);

export default app;