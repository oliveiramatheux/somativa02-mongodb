import express from 'express'
import router from './routes/index.js'
import cors from 'cors'
import { errors } from 'celebrate'
import { asyncHandlerError } from './middlewares/asyncHandlerError.js'

const server = express()
server.use(cors())
server.use(express.json())
server.use('/api', router)
server.use(errors())
server.use(asyncHandlerError)

export default server
