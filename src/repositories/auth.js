import { User } from '../models/index.js'

const authenticateUserByLoginAndPassword = async (login) => {
  const user = await User.findOne({ login }).select('+password')
  return user
}

export { authenticateUserByLoginAndPassword }
