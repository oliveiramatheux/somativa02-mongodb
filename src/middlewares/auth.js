import { celebrate, Joi, Segments } from 'celebrate'
import jwt from 'jsonwebtoken'
import { authSecret } from '../config/auth.js'

const validateParamsAuthentication = celebrate({
  [Segments.BODY]: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required()
  })
})

const verifyToken = (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).send('Error: No token provided')
  }

  const parts = authHeader.split(' ')

  if (!(parts.length === 2)) {
    return response.status(401).send('Error: Token error')
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).send('Error: Token malformatted')
  }

  jwt.verify(token, authSecret.secret, (err, decoded) => {
    if (err) {
      return response.status(401).send('Error: Token invalid')
    }
    request.headers.userId = decoded.id
    return next()
  })
}

export {
  validateParamsAuthentication,
  verifyToken
}
