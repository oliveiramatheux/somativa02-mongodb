import mongoose, { Schema } from 'mongoose'

const BookSalesSchema = new Schema({
  booksSold: {
    type: [{
      _id: false,
      bookId: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  paymentMethod: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
  versionKey: false
})

BookSalesSchema.index({ users: 1 })

const BookSales = mongoose.model('bookSales', BookSalesSchema)

export { BookSales }
