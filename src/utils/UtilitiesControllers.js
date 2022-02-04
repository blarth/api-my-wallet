export async function getUsersfromDB(req, res){
    res.send(await db.collection("users").find({}).toArray())
}

export async function getSessionsfromDB (req, res) {
    res.send(await db.collection("sessions").find({}).toArray())
}
export async function deleteEntriesfromDB (req, res)  {
    await db.collection("wallet").deleteMany({})
    res.sendStatus(200)
}