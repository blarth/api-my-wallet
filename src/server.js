import { MongoClient, ObjectId } from "mongodb";
import { stripHtml } from "string-strip-html";
import cors from "cors";
import express, { json } from "express";
import joi from "joi";
import dotenv from "dotenv";
import dayjs from "dayjs";
import bcrypt from 'bcrypt'
import {v4 as tokenGenerator} from "uuid"

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db("my-wallet");
});

const server = express();
server.use(cors());
server.use(json());

function sanitizeData(string) {
    return stripHtml(string.trim()).result;
  }

const schemaSignUp = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
const schemaLogin = joi.object({
    name: joi.string().min(1).required(),
  });

server.post("/sign-up", async (req, res) => {
  
  const user = req.body;

  const validation = schemaSignUp.validate(user)

  if (validation.error) {
    res.status(422).send("Name deve ser strings não vazio");
    console.log(validation.error.details);
    return;
  }

  const userData = {
      name : sanitizeData(user.name),
      email : sanitizeData(user.email),
      password : sanitizeData(user.password)
  }

  const passwordHash = bcrypt.hashSync(userData.password, parseInt(process.env.DIF));
  try {
      await db.collection("users").insertOne({ ...userData, password: passwordHash });
      res.sendStatus(201);
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }

  
});

server.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = tokenGenerator();

    await db.collection("sessions").insertOne({
      userId: user._id,
      token,
    });

    res.send(token);
  } else {
    // usuário não encontrado (email ou senha incorretos)
  }
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000.");
});

