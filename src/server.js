import cors from "cors";
import express, { json } from "express";
import router from "./routes/index.js"



const server = express();


server.use(cors());
server.use(json());
server.use(router)


export default router;

server.listen(5000, () => {
    console.log("Server is listening on port 5000.");
});

