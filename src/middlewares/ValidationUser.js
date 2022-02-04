import schemaEntries from "../Schema/SchemaEntries.js"

export default function validateBodyEntries(req, res, next){
    const validation = schemaEntries.validate(req.body , {abortEarly : true})
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }

    res.locals.data = {
        ...req.body , 
        description : sanitizeData(entry.description)
    }
    next();

    
}
