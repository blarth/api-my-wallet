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
    email: joi.string().required(),
    password : joi.string().required()
  });
const schemaEntries = joi.object({
    value: joi.number().required(),
    description : joi.string().required(),
    type : joi.any().allow("in" , "out")
  });

server.post("/sign-up", async (req, res) => {
  
  const user = req.body;
  const validation = schemaSignUp.validate(user)

  if (validation.error) {
    res.status(422).send(validation.error.details)
    return;
  }

  const userData = {
      name : sanitizeData(user.name),
      email : sanitizeData(user.email),
      password : sanitizeData(user.password)
  }

  
  try {
        const alreadyInDB = await db.collection("users").findOne({userData})
        if(alreadyInDB){
            return res.sendStatus(409)
        }
        const passwordHash = bcrypt.hashSync(userData.password, parseInt(process.env.DIF));
        await db.collection("users").insertOne({ ...userData, password: passwordHash });
        res.sendStatus(201);
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }

  
});


server.post("/login", async (req, res) => {
    const userSingIn = req.body;
    
    const validation = schemaLogin.validate(userSingIn)
    
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }
    
    const userData = {
        email : sanitizeData(userSingIn.email),
        password : sanitizeData(userSingIn.password)
    }
    
    try {
        const userVal = await db.collection("users").findOne({ email : userData.email });
        
        
        if (userVal && bcrypt.compareSync(userData.password, userVal.password)) {
            const token = tokenGenerator();
            console.log()
            
            await db.collection("sessions").insertOne({
                userId: userVal._id,
                token,
            });
            res.send(token);
        } else {
            res.status(401).send("email or password incorrect")
        }
        
    } catch (error) {
     console.log(error)   
     res.sendStatus(500)
    }
});

server.get("/wallet" , async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    const valToken = await db.collection("sessions").findOne({token})
    
    if(!valToken){
        res.sendStatus(401)
        return
    }
    try {
        res.status(200).send(await db.collection("wallet").find({userId : valToken.userId}).toArray())
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

server.post("/entries" , async(req, res) => {
    const { authorization } = req.headers;
    const entry = req.body

    const token = authorization?.replace('Bearer ', '');
    
    const valToken = await db.collection("sessions").findOne({token})
    
    if(!valToken){
        res.sendStatus(401)
        return
    }
    

    const validation = schemaEntries.validate(entry)
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }

    const entryData = {
        ...entry , 
        description : sanitizeData(entry.description)
    }

    try {
        await db.collection("wallet").insertOne({...entryData, userId : valToken.userId, date : dayjs().format("DD/MM")})
        res.sendStatus(201)

        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

    
    

})

server.get("/db" , async(req, res) =>{
    res.send(await db.collection("users").find({}).toArray())
} )
server.get("/session" , async(req, res) =>{
    res.send(await db.collection("sessions").find({}).toArray())
} )
server.listen(5000, () => {
    console.log("Server is listening on port 5000.");
});

