const asyncHandlerError = (error, _request, response, next) => {
  if (error.status && error.message) {
    return response.status(error.status).send(`Error: ${error.message}`)
  }
  response.status(500).send('Error: unknown server error')
  next()
}

export { asyncHandlerError }
