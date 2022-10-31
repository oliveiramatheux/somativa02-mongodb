import { Router } from 'express'
import { bookController } from '../controllers/index.js'
import {
  validateParamsGetBookById,
  validateParamsCreateBook,
  validateParamsDeleteBookById,
  validateParamsUpdateBookById,
  validateParamsGetBookByTitle
} from '../middlewares/index.js'

const router = Router()

router.get('/:id', validateParamsGetBookById, bookController.getBookByIdController)

router.post('/', validateParamsCreateBook, bookController.createBookController)

router.delete('/:id', validateParamsDeleteBookById, bookController.deleteBookByIdController)

router.patch('/:id', validateParamsUpdateBookById, bookController.updateBookByIdController)

router.get('/title/:title', validateParamsGetBookByTitle, bookController.getBookByTitleController)

export default router
