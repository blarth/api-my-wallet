import joi from "joi";

const schemaSignUp = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  export default schemaSignUp
  