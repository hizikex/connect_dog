import express from "express";
import { findOwners, findUser, login, registerUser } from "../controller/user.js";
import { authenticate } from '../middleware/authentication.js'

const Route = express.Router();

  Route.post('/register', registerUser);
  Route.post('/login', login);
  Route.get('/', authenticate, findUser);
  Route.get('/', authenticate, findOwners);
  
export default Route;