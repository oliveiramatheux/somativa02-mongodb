import {
  getBookById,
  createBook,
  deleteBookById,
  updateBookById,
  getBookByTitle
} from '../repositories/index.js'
import { handleError } from '../utils/errors.js'
import { objectFormatter } from '../utils/objectFormatter.js'

const formatBookResponse = ({
  _id, userId, title, authors, publisher, publishedDate, description, pageCount, categories, language, quantityAvailable
}) => ({
  id: _id,
  userId,
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

const getBookByIdService = async (id) => {
  const bookResponse = await getBookById(id)

  if (!bookResponse) {
    throw handleError(404, 'Book not found')
  }

  return formatBookResponse(bookResponse)
}

const createBookService = async (newBook) => {
  const newBookResponse = await createBook(newBook)

  if (!newBookResponse) {
    throw handleError(400, 'An error ocurred when create a book')
  }

  return formatBookResponse(newBookResponse)
}

const deleteBookByIdService = async (id) => {
  const bookResponse = await getBookById(id)

  if (!bookResponse) {
    throw handleError(404, 'Book not found')
  }

  const bookDeleteResponse = await deleteBookById(id)
  return formatBookResponse(bookDeleteResponse)
}

const updateBookByIdService = async (id, newBook) => {
  const bookResponse = await getBookById(id)

  if (!bookResponse) {
    throw handleError(404, 'Book not exist')
  }

  const bookUpdateResponse = await updateBookById(id, objectFormatter(newBook))
  return formatBookResponse(bookUpdateResponse)
}

const getBookByTitleService = async (title) => {
  const bookResponse = await getBookByTitle(title)

  if (!bookResponse) {
    throw handleError(404, 'Book not found')
  }

  return formatBookResponse(bookResponse)
}

export {
  getBookByIdService,
  createBookService,
  deleteBookByIdService,
  updateBookByIdService,
  getBookByTitleService
}
