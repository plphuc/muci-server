import Joi from "joi";
import joiObjectid from "joi-objectid";

const joiObjectId = joiObjectid(Joi);

const createPageSchema = {
  body: Joi.object().keys({
    title: Joi.string().required().invalid(''),
    icon: Joi.string().invalid(''),
    owner: joiObjectId().required(),
    isFavPage: Joi.boolean(),
    sharedUser: joiObjectId(),
    content: Joi.string().required().invalid(''),
  }),
}

export { createPageSchema }