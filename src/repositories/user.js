import { User } from '../models/index.js'

const getUserById = async (id) => {
  const user = await User.findById({ _id: id })
  return user
}

const createNewUser = async (newUser) => {
  const user = await User.create(newUser)
  return user
}

const deleteUserById = async (id) => {
  const user = await User.findByIdAndRemove({ _id: id })
  return user
}

const updateUserById = async (id, newUser) => {
  const user = await User.findOneAndUpdate({ _id: id }, newUser, {
    new: true
  })
  return user
}

const getUserByLogin = async (login) => {
  const user = await User.findOne({ login })
  return user
}

export { getUserById, createNewUser, deleteUserById, updateUserById, getUserByLogin }
