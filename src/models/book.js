import mongoose, { Schema } from 'mongoose'

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  authors: {
    type: [],
    require: true
  },
  publisher: {
    type: String,
    required: true
  },
  publishedDate: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  pageCount: {
    type: Number,
    require: true
  },
  categories: {
    type: [],
    require: true
  },
  language: {
    type: String,
    require: true
  },
  quantityAvailable: {
    type: Number,
    required: true,
    default: 0
  }
},
{
  timestamps: true,
  versionKey: false
})

const Book = mongoose.model('books', BookSchema)

export { Book }
