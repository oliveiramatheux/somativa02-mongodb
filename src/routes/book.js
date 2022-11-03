import { Router } from 'express'
import { bookController } from '../controllers/index.js'
import {
  validateParamsGetBookById,
  validateParamsCreateBook,
  validateParamsDeleteBookById,
  validateParamsUpdateBookById,
  validateParamsGetBookByTitle,
  verifyToken
} from '../middlewares/index.js'

const router = Router()

router.get('/:id', verifyToken, validateParamsGetBookById, bookController.getBookByIdController)

router.post('/', verifyToken, validateParamsCreateBook, bookController.createBookController)

router.delete('/:id', verifyToken, validateParamsDeleteBookById, bookController.deleteBookByIdController)

router.patch('/:id', verifyToken, validateParamsUpdateBookById, bookController.updateBookByIdController)

router.get('/title/:title', verifyToken, validateParamsGetBookByTitle, bookController.getBookByTitleController)

export default router
