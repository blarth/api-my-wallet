import validateToken from "../middlewares/ValidateToken.js";
import validateBodyEntries from "../middlewares/ValidationUser.js"
import { myWallet, newEntries, returnEntryById, changeEntryById} from "../controllers/WalletControllers.js";
import express from "express";

const walletRouter = express.Router();

walletRouter.get("/wallet" , validateToken, myWallet)

walletRouter.post("/entries", validateToken, validateBodyEntries, newEntries)

walletRouter.get("/entry/:idEntry", validateToken, returnEntryById)

walletRouter.post("/entry/:idEntry", validateToken, validateBodyEntries, changeEntryById)

export default walletRouter