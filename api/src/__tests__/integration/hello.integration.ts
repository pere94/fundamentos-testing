import { createApp } from '@/create.app'
import { type Express } from 'express'
import { type Server } from 'http'
import request from 'supertest'

describe('Hello Api', () => {
  let app: Express
  let server: Server

  beforeAll(() => {
    app = createApp()
    server = app.listen(3000)
  })

  afterAll((doneCallback) => {
    server.close(doneCallback)
  })

  describe('GET /', () => {
    test('should return "Home page Api!"', async () => {
      await request(app)
        .get('/')
        .expect(200)
        .then((response) => {
          expect(response.text).toEqual('Home page Api!')
        })
    })
  })
})
