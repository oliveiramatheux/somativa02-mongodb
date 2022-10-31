import { BookSales } from '../models/index.js'

const getBookSalesById = async (id) => {
  const bookSales = await BookSales.findById({ _id: id })
  return bookSales
}

const createNewBookSales = async (newBookSales) => {
  const bookSales = await BookSales.create(newBookSales)
  return bookSales
}

const deleteBookSalesById = async (id) => {
  const bookSales = await BookSales.findByIdAndRemove({ _id: id })
  return bookSales
}

const updateBookSalesById = async (id, newBookSales) => {
  const bookSales = await BookSales.findOneAndUpdate({ _id: id }, newBookSales, {
    new: true
  })
  return bookSales
}

const getBookSalesByUserId = async (userId, startDate, endDate) => {
  const bookSales = await BookSales.find(startDate && endDate ? { userId, createdAt: { $gte: startDate, $lt: endDate } } : { userId })
  return bookSales
}

export { getBookSalesById, createNewBookSales, deleteBookSalesById, updateBookSalesById, getBookSalesByUserId }
