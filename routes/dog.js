import express from "express";
import { registerDog } from '../controller/dog.js';
import { authenticate } from '../middleware/authentication.js'

const Route = express.Router();

Route.post('/register', authenticate, registerDog);

export default Route;