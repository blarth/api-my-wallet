
export async function myWallet (req, res){
    
    const valUser = res.locals.user

    try {
        
        res.status(200).send(await db.collection("wallet").find({userId : valUser.userId}).toArray())
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function newEntries (req, res)  {
    
    const valUser = res.locals.user
    const entryData = res.locals.data

    try {
        await db.collection("wallet").insertOne({...entryData, userId : valUser.userId, date : dayjs().format("DD/MM")})
        res.sendStatus(201)

        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

    
    

}