import { celebrate, Joi, Segments } from 'celebrate'
import JoiObjectId from 'joi-objectid'

const myJoiObjectId = JoiObjectId(Joi)

const validateParamsId = {
  [Segments.PARAMS]: Joi.object().keys({
    id: myJoiObjectId().required()
  })
}

const validateParamsGetBookById = celebrate({
  ...validateParamsId
})

const validateParamsCreateBook = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    authors: Joi.array().items(Joi.string().required()),
    publisher: Joi.string().required(),
    publishedDate: Joi.string().required(),
    description: Joi.string().required(),
    pageCount: Joi.number().required(),
    categories: Joi.array().items(Joi.string().required()),
    language: Joi.string().required(),
    quantityAvailable: Joi.number().required()
  })
})

const validateParamsDeleteBookById = celebrate({
  ...validateParamsId
})

const validateParamsUpdateBookById = celebrate({
  ...validateParamsId,
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string(),
    authors: Joi.array().items(Joi.string()),
    publisher: Joi.string(),
    publishedDate: Joi.string(),
    description: Joi.string(),
    pageCount: Joi.number(),
    categories: Joi.array().items(Joi.string()),
    language: Joi.string(),
    quantityAvailable: Joi.number()
  })
})

const validateParamsGetBookByTitle = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    title: Joi.string().required()
  })
})

export {
  validateParamsGetBookById,
  validateParamsCreateBook,
  validateParamsDeleteBookById,
  validateParamsUpdateBookById,
  validateParamsGetBookByTitle
}
