import { Router } from 'express'
import { bookSalesController } from '../controllers/index.js'
import {
  validateParamsGetBookSalesById,
  validateParamsCreateBookSales,
  validateParamsDeleteBookSalesById,
  validateParamsUpdateBookSalesById,
  validateParamsGetBookSalesByUserId,
  verifyToken
} from '../middlewares/index.js'

const router = Router()

router.get('/:id', verifyToken, validateParamsGetBookSalesById, bookSalesController.getBookSalesByIdController)

router.post('/', verifyToken, validateParamsCreateBookSales, bookSalesController.createBookSalesController)

router.delete('/:id', verifyToken, validateParamsDeleteBookSalesById, bookSalesController.deleteBookSalesByIdController)

router.patch('/:id', verifyToken, validateParamsUpdateBookSalesById, bookSalesController.updateBookSalesByIdController)

router.get('/user/list', verifyToken, validateParamsGetBookSalesByUserId, bookSalesController.getBookSalesByUserIdController)

export default router
