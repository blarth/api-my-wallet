import { MongoClient, ObjectId } from "mongodb";
import { stripHtml } from "string-strip-html";
import cors from "cors";
import express, { json } from "express";
import joi from "joi";
import dotenv from "dotenv";
import dayjs from "dayjs";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db("my-wallet");
});

const server = express();
server.use(cors());
server.use(json());


app.post("/sign-up", async (req, res) => {
  //name, email, password
  const user = req.body;
  

  const passwordHash = bcrypt.hashSync(user.password, 10);

  await db.collection("users").insertOne({ ...user, password: passwordHash });

  res.sendStatus(201);
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = uuid();

    await db.collection("sessions").insertOne({
      userId: user._id,
      token,
    });

    res.send(token);
  } else {
    // usuário não encontrado (email ou senha incorretos)
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000.");
});

