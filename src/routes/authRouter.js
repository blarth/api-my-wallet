import {validateSchemaSignUp, validateSchemaLogin} from '../middlewares/ValidateAuth.js';
import { signUp, login } from '../controllers/AuthControllers.js';
import express from 'express';

const authRouter = express.Router()

authRouter.post("/sign-up", validateSchemaSignUp ,signUp);

authRouter.post("/login", validateSchemaLogin  , login);

export default authRouter 