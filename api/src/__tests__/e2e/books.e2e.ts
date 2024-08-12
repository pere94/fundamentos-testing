import { type Db, MongoClient, ServerApiVersion } from 'mongodb'
import { createApp } from '@/create.app'
import { type Express } from 'express'
import { type Server } from 'http'
import request from 'supertest'
import { createBooksFake } from '@/utils/faker/faker.utils'
import { EnviromentVariablesConfig } from '@/config/EnviromentVariablesConfig.config'

const dbName = EnviromentVariablesConfig.dbNameTest ?? ''
const databaseUrlTest = EnviromentVariablesConfig.databaseUrlTest ?? ''

describe('Tests Api', () => {
  let app: Express
  let server: Server
  let database: Db
  let client: MongoClient

  beforeAll(async () => {
    app = createApp()
    server = app.listen(3005)
    client = new MongoClient(databaseUrlTest, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    await client.connect()
    database = client.db(dbName)
  }, 60000)

  afterAll((doneCallback) => {
    (async () => {
      try {
        if (database?.dropDatabase) await database.dropDatabase()
        await client.close()
        server.close(doneCallback)
      } catch (error) {
        console.log('🚀 ~ error:', error)
      }
    })().catch(() => {})
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
      try {
        const seedData = await database.collection('books').insertMany(createBooksFake(20))
        await request(app)
          .get('/api/v1/books')
          .expect(200)
          .then((response) => {
            expect(response.body.message).toEqual('Success')
            expect(response.body.data.length).toEqual(seedData.insertedCount)
          })
      } catch (error) {
        console.log('🚀 ~ test ~ error:', error)
      }
    })
  })
})
