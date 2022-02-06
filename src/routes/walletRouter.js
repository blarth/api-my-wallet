import validateToken from "../middlewares/ValidateToken.js";
import validateBodyEntries from "../middlewares/ValidationUser.js"
import { myWallet, newEntries, returnEntryById, changeEntryById, deleteEntryById} from "../controllers/WalletControllers.js";
import express from "express";

const walletRouter = express.Router();

walletRouter.get("/wallet" , validateToken, myWallet)

walletRouter.post("/entries", validateToken, validateBodyEntries, newEntries)

walletRouter.get("/entry/:idEntry", validateToken, returnEntryById)

walletRouter.put("/entry/:idEntry", validateToken, validateBodyEntries, changeEntryById)

walletRouter.delete("/entry/:idEntry", validateToken, deleteEntryById)

export default walletRouter