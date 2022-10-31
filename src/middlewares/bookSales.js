import { celebrate, Joi, Segments } from 'celebrate'
import JoiObjectId from 'joi-objectid'

const myJoiObjectId = JoiObjectId(Joi)

const validateParamsId = {
  [Segments.PARAMS]: Joi.object().keys({
    id: myJoiObjectId().required()
  })
}

const validateParamsGetBookSalesById = celebrate({
  ...validateParamsId
})

const validateParamsCreateBookSales = celebrate({
  [Segments.BODY]: Joi.object().keys({
    booksSold: Joi.array().items(Joi.object({
      bookId: myJoiObjectId().required(),
      quantity: Joi.number().required()
    }).required()).required(),
    userId: myJoiObjectId().required(),
    price: Joi.number().required(),
    paymentMethod: Joi.string().required()
  })
})

const validateParamsDeleteBookSalesById = celebrate({
  ...validateParamsId
})

const validateParamsUpdateBookSalesById = celebrate({
  ...validateParamsId,
  [Segments.BODY]: Joi.object().keys({
    booksSold: Joi.array().items(Joi.object({
      bookId: myJoiObjectId(),
      quantity: Joi.number()
    })),
    userId: myJoiObjectId(),
    price: Joi.number(),
    paymentMethod: Joi.string()
  })
})

const validateParamsGetBookSalesByUserId = celebrate({
  [Segments.BODY]: Joi.object().keys({
    userId: myJoiObjectId().required(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    commissionPercentage: Joi.number()
  })
})

export {
  validateParamsGetBookSalesById,
  validateParamsCreateBookSales,
  validateParamsDeleteBookSalesById,
  validateParamsUpdateBookSalesById,
  validateParamsGetBookSalesByUserId
}
