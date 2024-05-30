import express from "express";
import { registerDog, findDogByUniqueName, findDogs} from '../controller/dog.js';
import { authenticate } from '../middleware/authentication.js'

const Route = express.Router();

Route.post('/register', authenticate, registerDog);
Route.get('/:uniqueName', authenticate, findDogByUniqueName);
Route.get('/', authenticate, findDogs);

export default Route;