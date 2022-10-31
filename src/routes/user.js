import { Router } from 'express'
import { userController } from '../controllers/index.js'
import {
  validateParamsGetUserById,
  validateParamsCreateUser,
  validateParamsDeleteUserById,
  validateParamsUpdateUser
} from '../middlewares/index.js'

const router = Router()

router.get('/:id', validateParamsGetUserById, userController.getUserByIdController)

router.post('/', validateParamsCreateUser, userController.createUserController)

router.delete('/:id', validateParamsDeleteUserById, userController.deleteUserByIdController)

router.patch('/:id', validateParamsUpdateUser, userController.updateUserByIdController)

export default router
