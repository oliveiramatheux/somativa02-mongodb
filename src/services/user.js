import { getUserById, createNewUser, deleteUserById, updateUserById, getUserByLogin } from '../repositories/index.js'
import { handleError } from '../utils/errors.js'
import { objectFormatter } from '../utils/objectFormatter.js'

const formatResponse = (response) => {
  return {
    id: response._id,
    name: response.name,
    login: response.login,
    role: response.role,
    age: response.age
  }
}

const getUser = async (id) => {
  const userResponse = await getUserById(id)
  if (!userResponse) {
    throw handleError(404, 'User not found')
  }
  return formatResponse(userResponse)
}

const createUser = async (newUser) => {
  const verifyLoginAlredyExist = await getUserByLogin(newUser.login)

  if (verifyLoginAlredyExist) {
    throw handleError(409, 'User login alredy exist')
  }

  const newUserResponse = await createNewUser(newUser)

  if (!newUserResponse) {
    throw handleError(400, 'An eror occured when create this user')
  }

  return formatResponse(newUserResponse)
}

const deleteUser = async (id) => {
  const userResponse = await deleteUserById(id)
  if (!userResponse) {
    throw handleError(404, 'User not found')
  }
  return formatResponse(userResponse)
}

const updateUser = async (id, newUser) => {
  const verifyUserAlredyExist = await getUserById(id)
  if (!verifyUserAlredyExist) {
    throw handleError(404, 'User not exist')
  }

  const verifyLoginAlredyExist = await getUserByLogin(newUser.login)
  if (verifyLoginAlredyExist) {
    throw handleError(409, 'User login alredy exist')
  }

  const newUserResponse = await updateUserById(id, objectFormatter(newUser))
  if (!newUserResponse) {
    throw handleError(400, 'An error occured when update this user')
  }
  return formatResponse(newUserResponse)
}

export { getUser, createUser, deleteUser, updateUser }
