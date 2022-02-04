import db from "../../db.js";
import {v4 as tokenGenerator} from "uuid"
import bcrypt from 'bcrypt'

export async function signUp(req, res) {
  
    const userData = res.locals.user
    
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
  
    
  }

export async function login (req, res)  {
    
    
    userData = res.locals.user
    try {
        const userVal = await db.collection("users").findOne({ email : userData.email });
        
        
        if (userVal && bcrypt.compareSync(userData.password, userVal.password)) {
            const token = tokenGenerator();
            console.log()
            
            await db.collection("sessions").insertOne({
                userId: userVal._id,
                token,
            });
            res.send({token , name : userVal.name});
        } else {
            res.status(401).send("email or password incorrect")
        }
        
    } catch (error) {
     console.log(error)   
     res.sendStatus(500)
    }
}