import {
  getBookSalesByIdService,
  createBookSalesService,
  deleteBookSalesByIdService,
  updateBookSalesByIdService,
  getBookSalesByUserIdService
} from '../services/index.js'
import asyncHandler from 'express-async-handler'

const getBookSalesByIdController = asyncHandler(async (request, response) => {
  const { id } = request.params
  const bookSales = await getBookSalesByIdService(id)
  response.status(200).send(bookSales)
})

const createBookSalesController = asyncHandler(async (request, response) => {
  const {
    booksSold, userId, price, paymentMethod
  } = request.body

  const newBookSales = await createBookSalesService({
    booksSold,
    userId,
    price,
    paymentMethod
  })
  response.status(201).send(newBookSales)
})

const deleteBookSalesByIdController = asyncHandler(async (request, response) => {
  const { id } = request.params
  const bookSales = await deleteBookSalesByIdService(id)
  response.status(200).send(bookSales)
})

const updateBookSalesByIdController = asyncHandler(async (request, response) => {
  const { id } = request.params
  const {
    booksSold, userId, price, paymentMethod
  } = request.body
  const newBookSales = await updateBookSalesByIdService(id, {
    booksSold,
    userId,
    price,
    paymentMethod
  })
  response.status(200).send(newBookSales)
})

const getBookSalesByUserIdController = asyncHandler(async (request, response) => {
  const {
    userId, startDate, endDate, commissionPercentage
  } = request.body

  const bookSales = await getBookSalesByUserIdService({
    userId,
    startDate,
    endDate,
    commissionPercentage
  })
  response.status(200).send(bookSales)
})

export {
  getBookSalesByIdController,
  createBookSalesController,
  deleteBookSalesByIdController,
  updateBookSalesByIdController,
  getBookSalesByUserIdController
}
