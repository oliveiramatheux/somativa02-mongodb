import { Router } from 'express'
import { authenticationController } from '../controllers/index.js'
import { validateParamsAuthentication } from '../middlewares/index.js'

const router = Router()

router.post('/', validateParamsAuthentication, authenticationController.authenticateUserController)

export default router
