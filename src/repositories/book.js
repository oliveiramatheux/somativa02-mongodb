import { Book } from '../models/index.js'

const getBookById = async (id) => {
  const book = await Book.findById({ _id: id })
  return book
}

const createBook = async (newBook) => {
  const book = await Book.create(newBook)
  return book
}

const deleteBookById = async (id) => {
  const book = await Book.findByIdAndRemove({ _id: id })
  return book
}

const updateBookById = async (id, newBook) => {
  const book = await Book.findOneAndUpdate({ _id: id }, newBook, {
    new: true
  })
  return book
}

const getBookByTitle = async (title) => {
  const book = await Book.findOne({ title: { $regex: title, $options: 'i' } })
  return book
}

export { getBookById, createBook, deleteBookById, updateBookById, getBookByTitle }
