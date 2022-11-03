import { Router } from 'express'
import userRouter from './user.js'
import bookRouter from './book.js'
import bookSalesRouter from './bookSales.js'
import authenticationRouter from './auth.js'

const router = Router()

router.use('/user', userRouter)
router.use('/book', bookRouter)
router.use('/bookSales', bookSalesRouter)
router.use('/auth', authenticationRouter)

export default router
