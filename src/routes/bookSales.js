import { Router } from 'express'
import { bookSalesController } from '../controllers/index.js'
import {
  validateParamsGetBookSalesById,
  validateParamsCreateBookSales,
  validateParamsDeleteBookSalesById,
  validateParamsUpdateBookSalesById,
  validateParamsGetBookSalesByUserId
} from '../middlewares/index.js'

const router = Router()

router.get('/:id', validateParamsGetBookSalesById, bookSalesController.getBookSalesByIdController)

router.post('/', validateParamsCreateBookSales, bookSalesController.createBookSalesController)

router.delete('/:id', validateParamsDeleteBookSalesById, bookSalesController.deleteBookSalesByIdController)

router.patch('/:id', validateParamsUpdateBookSalesById, bookSalesController.updateBookSalesByIdController)

router.get('/user/list', validateParamsGetBookSalesByUserId, bookSalesController.getBookSalesByUserIdController)

export default router
