import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import randomstring from 'randomstring'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: [6, 'Password should be at least six characters'],
    select: false
  },
  role: {
    type: String,
    required: true
  },
  age: {
    type: String
  },
  resetToken: {
    type: String
  }
},
{
  timestamps: true,
  versionKey: false
})

UserSchema.pre('save', userPreSaveHook)

export async function userPreSaveHook (next) {
  this.password = await bcrypt.hash(this.password, 10)
  this.resetToken = randomstring.generate({
    length: 8,
    charset: 'numeric'
  })
  next()
}

UserSchema.index({ login: 1 })

const User = mongoose.model('Users', UserSchema)

export { User }
