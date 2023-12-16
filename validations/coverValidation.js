import Joi from "joi";

const addCoverSchema = {
  body: Joi.object().keys({
    file: Joi.binary().required()
  })
}

export { addCoverSchema }