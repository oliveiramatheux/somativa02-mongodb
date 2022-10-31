import { celebrate, Joi, Segments } from 'celebrate'
import JoiObjectId from 'joi-objectid'

const myJoiObjectId = JoiObjectId(Joi)

const validateParamsId = {
  [Segments.PARAMS]: Joi.object().keys({
    id: myJoiObjectId().required()
  })
}

const validateParamsGetUserById = celebrate({
  ...validateParamsId
})

const validateParamsCreateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
    age: Joi.number().integer()
  })
})

const validateParamsDeleteUserById = celebrate({
  ...validateParamsId
})

const validateParamsUpdateUser = celebrate({
  ...validateParamsId,
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    login: Joi.string(),
    password: Joi.string().min(6),
    role: Joi.string(),
    age: Joi.number().integer()
  })
})

export {
  validateParamsGetUserById,
  validateParamsCreateUser,
  validateParamsDeleteUserById,
  validateParamsUpdateUser
}
