import validateToken from "../middlewares/ValidateToken.js";
import validateBodyEntries from "../middlewares/ValidationUser.js"
import { myWallet, newEntries } from "../controllers/WalletControllers.js";
import express from "express";

const walletRouter = express.Router();

walletRouter.get("/wallet" , validateToken, myWallet)

walletRouter.post("/entries", validateToken, validateBodyEntries, newEntries)

export default walletRouter