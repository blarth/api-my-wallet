import { getSessionsfromDB, getUsersfromDB, deleteEntriesfromDB,  } from "../utils/UtilitiesControllers.js";
import express from "express";

const utilRouter = express.Router();

utilRouter.get("/db" , getUsersfromDB )

utilRouter.get("/session" , getSessionsfromDB )

utilRouter.delete("/entries" , deleteEntriesfromDB)

export default utilRouter