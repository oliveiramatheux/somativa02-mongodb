import { authenticateUserService } from '../services/index.js'
import asyncHandler from 'express-async-handler'

const authenticateUserController = asyncHandler(async (request, response) => {
  const { login, password } = request.body
  const user = await authenticateUserService({ login, password })
  response.status(200).send(user)
})

export {
  authenticateUserController
}
