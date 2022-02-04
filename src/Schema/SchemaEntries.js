import joi from "joi";

const schemaEntries = joi.object({
    value: joi.string().required(),
    description : joi.string().required(),
    type: joi.string().valid("in", "out").required(),
  });

export default schemaEntries;
