import express from "express";
import { registerDog, findDogByUniqueName, findDogs} from '../controller/dog.js';
import { authenticate } from '../middleware/authentication.js'

const Route = express.Router();

Route.post('/register', authenticate, registerDog);
Route.get('/:uniqueName', findDogByUniqueName);
Route.get('/', findDogs);

export default Route;