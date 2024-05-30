import express from "express";
import { findOwners, findUser, login, registerUser } from "../controller/user.js";

const Route = express.Router();

  Route.post('/register', registerUser);
  Route.post('/login', login);
  Route.get('/:username', findUser);
  Route.get('/', findOwners);
  
export default Route;