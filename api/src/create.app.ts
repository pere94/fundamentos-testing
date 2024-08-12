import express, { type Express } from 'express'
import { routerApi } from './modules/routes'

const createApp = (): Express => {
  const app = express()
  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('Home page Api!')
  })

  routerApi(app)

  return app
}

export { createApp }
