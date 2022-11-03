import {
  getBookSalesById,
  createNewBookSales,
  deleteBookSalesById,
  updateBookSalesById,
  getBookSalesByUserId,
  getBookById,
  updateBookById
} from '../repositories/index.js'
import { handleError } from '../utils/errors.js'
import { objectFormatter } from '../utils/objectFormatter.js'

const formatBookSaleResponse = ({
  _id, booksSold, userId, price, paymentMethod
}) => ({
  id: _id,
  booksSold,
  userId,
  price,
  paymentMethod
})

const formatBooksSalesResponse = (booksSales, commisionResult) => {
  return (
    {
      items:
      booksSales.map(book => ({
        id: book._id,
        booksSold: book.booksSold,
        userId: book.userId,
        price: book.price,
        paymentMethod: book.paymentMethod
      })
      ),
      totalItems: booksSales.length,
      comissionPerTotalSales: commisionResult || 'Not informed the percentage.'
    }
  )
}

const getBookSalesByIdService = async (id) => {
  const bookSaleResponse = await getBookSalesById(id)

  if (!bookSaleResponse) {
    throw handleError(404, 'Book sale not found')
  }

  return formatBookSaleResponse(bookSaleResponse)
}

const createBookSalesService = async (newBookSales) => {
  const errors = []

  const bookVerificationPromisses = newBookSales.booksSold.map(async value => {
    const bookResponse = await getBookById(value.bookId)

    if (!bookResponse) {
      return errors.push('One or more of the books send not found')
    }

    const isAvailable = bookResponse.quantityAvailable > 0 && bookResponse.quantityAvailable >= value.quantity

    if (!isAvailable) {
      errors.push(`The book: ${bookResponse._id} ${bookResponse.title}, no have sufficient volumes to sell`)
    }
  })

  await Promise.all(bookVerificationPromisses)

  if (errors.length) throw handleError(400, errors[0])

  const newBookSalesResponse = await createNewBookSales(newBookSales)

  if (!newBookSalesResponse) {
    throw handleError(400, 'An error ocurred when create a book sales')
  }

  const bookUpdateQuantityPromisses = newBookSales.booksSold.map(async value => {
    const bookResponse = await getBookById(value.bookId)

    if (!bookResponse) {
      return errors.push('One or more of the books send not found')
    }

    const bookUpdatedResponse = await updateBookById(bookResponse._id, { quantityAvailable: bookResponse.quantityAvailable - value.quantity })

    if (!bookUpdatedResponse) {
      errors.push(`Failed when updated book ${value.bookId} quantity`)
    }
  })

  await Promise.all(bookUpdateQuantityPromisses)

  if (errors.length) throw handleError(400, errors[0])

  return formatBookSaleResponse(newBookSalesResponse)
}

const deleteBookSalesByIdService = async (id) => {
  const bookSalesResponse = await getBookSalesById(id)

  if (!bookSalesResponse) {
    throw handleError(404, 'Book sales not found')
  }

  const bookSalesDeleteResponse = await deleteBookSalesById(id)
  return formatBookSaleResponse(bookSalesDeleteResponse)
}

const updateBookSalesByIdService = async (id, newBookSales) => {
  const bookSalesResponse = await getBookSalesById(id)

  if (!bookSalesResponse) {
    throw handleError(404, 'Book sales not exist')
  }

  const bookSalesUpdateResponse = await updateBookSalesById(id, objectFormatter(newBookSales))
  return formatBookSaleResponse(bookSalesUpdateResponse)
}

const getBookSalesByUserIdService = async (params) => {
  const bookSalesResponse = await getBookSalesByUserId(params.userId, params.startDate, params.endDate)

  if (!bookSalesResponse) {
    throw handleError(404, 'Book sales not found')
  }

  let totalSalesPrice = 0
  bookSalesResponse.forEach((value) => {
    totalSalesPrice += value.price
  })

  const commisionResult = params.commissionPercentage ? +(totalSalesPrice * (params.commissionPercentage / 100)).toFixed(2) : undefined

  return formatBooksSalesResponse(bookSalesResponse, commisionResult)
}

export {
  getBookSalesByIdService,
  createBookSalesService,
  deleteBookSalesByIdService,
  updateBookSalesByIdService,
  getBookSalesByUserIdService
}
