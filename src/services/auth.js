import { authenticateUserByLoginAndPassword } from '../repositories/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authSecret } from '../config/auth.js'
import { handleError } from '../utils/errors.js'

const generateToken = (generateTokenParams) =>
  jwt.sign({ ...generateTokenParams }, authSecret.secret, {
    expiresIn: 86400
  })

const formatResponse = ({ _id, name, login }, token) => ({
  _id,
  name,
  login,
  token
})

const authenticateUserService = async (user) => {
  const userResponse = await authenticateUserByLoginAndPassword(user.login)

  if (!userResponse) {
    throw handleError(404, 'User not found')
  }

  if (!await bcrypt.compare(user.password, userResponse.password)) {
    throw handleError(400, 'Invalid password')
  }

  const token = generateToken({ id: userResponse._id })

  return formatResponse(userResponse, token)
}

export {
  authenticateUserService
}
