import express from "express";
import { authenticate } from '../middleware/authentication.js'
import { ownerInteraction } from "../controller/interaction.js";

const Route = express.Router();

  Route.post('/:senderDogId/:recipientDogId', ownerInteraction);
  
export default Route;
