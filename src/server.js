import cors from "cors";
import express, { json } from "express";
import authRouter from "./routes/authRouter.js";
import utilRouter from "./routes/utilsRouter.js";
import walletRouter from "./routes/walletRouter.js";



const server = express();
const router = express.Router()

server.use(cors());
server.use(json());
router.use(authRouter)
router.use(walletRouter)
router.use(utilRouter)


export default router;

server.listen(5000, () => {
    console.log("Server is listening on port 5000.");
});

