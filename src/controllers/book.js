import {
  getBookByIdService,
  createBookService,
  deleteBookByIdService,
  updateBookByIdService,
  getBookByTitleService
} from '../services/index.js'
import asyncHandler from 'express-async-handler'

const getBookByIdController = asyncHandler(async (request, response) => {
  const { id } = request.params
  const book = await getBookByIdService(id)
  response.status(200).send(book)
})

const createBookController = asyncHandler(async (request, response) => {
  const {
    title, authors, publisher,
    publishedDate, description, pageCount,
    categories, language, quantityAvailable
  } = request.body

  const newBook = await createBookService({
    title,
    authors,
    publisher,
    publishedDate,
    description,
    pageCount,
    categories,
    language,
    quantityAvailable
  })
  response.status(201).send(newBook)
})

const deleteBookByIdController = asyncHandler(async (request, response) => {
  const { id } = request.params
  const book = await deleteBookByIdService(id)
  response.status(200).send(book)
})

const updateBookByIdController = asyncHandler(async (request, response) => {
  const { id } = request.params
  const {
    title, authors, publisher,
    publishedDate, description, pageCount,
    categories, language, quantityAvailable
  } = request.body
  const newBook = await updateBookByIdService(id, {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    pageCount,
    categories,
    language,
    quantityAvailable
  })
  response.status(200).send(newBook)
})

const getBookByTitleController = asyncHandler(async (request, response) => {
  const { title } = request.params
  const book = await getBookByTitleService(title)
  response.status(200).send(book)
})

export {
  getBookByIdController,
  createBookController,
  deleteBookByIdController,
  updateBookByIdController,
  getBookByTitleController
}
