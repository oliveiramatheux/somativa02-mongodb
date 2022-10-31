import { getUser, createUser, deleteUser, updateUser } from '../services/index.js'
import asyncHandler from 'express-async-handler'

const getUserByIdController = asyncHandler(async (request, response) => {
  const { id } = request.params
  const user = await getUser(id)
  response.status(200).send(user)
})

const createUserController = asyncHandler(async (request, response) => {
  const { name, login, password, role, age } = request.body
  const newUser = await createUser({ name, login, password, role, age })
  response.status(201).send(newUser)
})

const deleteUserByIdController = asyncHandler(async (request, response) => {
  const { id } = request.params
  const user = await deleteUser(id)
  response.status(200).send(user)
})

const updateUserByIdController = asyncHandler(async (request, response) => {
  const { id } = request.params
  const { name, login, password, role, age } = request.body
  const newUser = await updateUser(id, { name, login, password, role, age })
  response.status(200).send(newUser)
})

export { getUserByIdController, createUserController, deleteUserByIdController, updateUserByIdController }
