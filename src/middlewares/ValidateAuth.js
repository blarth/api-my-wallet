import sanitizeData from "../Schema/Sanitizer.js";
import schemaLogin from "../Schema/SchemaLogin.js";
import schemaSignUp from "../Schema/SchemaSignup.js"


export function validateSchemaSignUp(req, res, next){
    const validation = schemaSignUp.validate(req.body)
  
    if (validation.error) {
      res.status(422).send(validation.error.details)
      return;
    }

    res.locals.user = {
        name : sanitizeData(req.body.name),
        email : sanitizeData(req.body.email),
        password : sanitizeData(req.body.password)
    }

    next()
}


export function validateSchemaLogin(req, res, next){

    const validation = schemaLogin.validate(req.body)
        
        if (validation.error) {
            res.status(422).send(validation.error.details);
            return;
        }
        
        res.locals.user = {
            email : sanitizeData(req.body.email),
            password : sanitizeData(req.body.password)
        }
        next()
}

