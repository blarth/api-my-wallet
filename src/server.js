import cors from "cors";
import express, { json } from "express";
import router from "./routes/index.js"

const server = express();


server.use(cors());
server.use(json());
server.use(router)


export default router;

server.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});

