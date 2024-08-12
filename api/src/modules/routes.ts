import express, { type Express } from 'express'
import { bookRouter } from './books/router/books.router'

const routerApi = (app: Express): void => {
  const router = express.Router()

  app.use('/api/v1', router)

  router.get('/', (req, res) => {
    res.send('API v1')
  })
  router.use('/books', bookRouter)
}

export { routerApi }
