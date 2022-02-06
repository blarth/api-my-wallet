import db from "../../db.js"
import dayjs from "dayjs"
import { ObjectId } from "mongodb"


export async function myWallet (req, res){
    
    const valUser = res.locals.user
    

    try {
        res.status(200).send(await db.collection("wallet").find({userId : valUser._id}).toArray())
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function newEntries (req, res)  {
    
    const valUser = res.locals.user
    const entryData = res.locals.data
    

    try {
        await db.collection("wallet").insertOne({...entryData, userId : valUser._id, date : dayjs().format("DD/MM")})
        res.sendStatus(201)

        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }


}

export async function returnEntryById (req, res){
    
    try{
        res.send(await db.collection("wallet").findOne({_id : new ObjectId(req.params.idEntry)}))
    }catch(error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function changeEntryById(req, res){
    try {
        const valUser = res.locals.user
        const entryData = res.locals.data
        
        await db.collection("wallet").updateOne({_id : new ObjectId(req.params.idEntry)} , { $set : {...entryData , userId : valUser._id, date : dayjs().format("DD/MM")}})
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

}

export async function deleteEntryById(req, res){
    try {
        await db.collection("wallet").deleteOne({_id : new ObjectId(req.params.idEntry)})
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}