import { createApp } from '@/create.app'
import { type Book } from '@/modules/books/entity/Book.class'
import { createBooksFake } from '@/utils/faker/faker.utils'
import { type Express } from 'express'
import { type Server } from 'http'
import request from 'supertest'

const mockBooks = createBooksFake(20)

jest.mock('@/database/MongoDB.class', () => {
  // MongoDB stub implementation
  class MongoDBStub {
    async getAll<T extends Book>(): Promise<T[]> {
      return await Promise.resolve(mockBooks as T[])
    }

    async getOneById<T extends Book>(collection: string, id: string): Promise<T | null> {
      const book = mockBooks.find(b => b._id.toHexString() === id)
      return await Promise.resolve(book as T | null)
    }
  }

  const mongoDBStub = new MongoDBStub()

  return {
    MongoDB: jest.fn().mockImplementation(() => mongoDBStub) // Return the stub instance
  }
})

describe('Tests Api', () => {
  let app: Express
  let server: Server

  beforeAll(() => {
    app = createApp()
    server = app.listen(3000)
  })

  afterAll((doneCallback) => {
    server.close(doneCallback)
  })

  describe('Test /', () => {
    test('should return "Home page Api!"', async () => {
      await request(app)
        .get('/')
        .expect(200)
        .then((response) => {
          expect(response.text).toEqual('Home page Api!')
        })
    })
  })

  describe('Tests /api/v1/books', () => {
    test('GET/api/v1/books', async () => {
      await request(app)
        .get('/api/v1/books')
        .expect(200)
        .then((response) => {
          expect(response.body.message).toEqual('Success')
          expect(response.body.data.length).toEqual(mockBooks.length)
        })
    })
  })
})
