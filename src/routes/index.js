import { Router } from 'express'
import userRouter from './user.js'
import bookRouter from './book.js'
import bookSalesRouter from './bookSales.js'

const router = Router()

router.use('/user', userRouter)
router.use('/book', bookRouter)
router.use('/bookSales', bookSalesRouter)

export default router
