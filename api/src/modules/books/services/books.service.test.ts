import { BookServices } from './books.service'
import { type Book } from '../entity/Book.class'
import { createBooksFake } from '@/utils/faker/faker.utils'

const mockBooks = createBooksFake(20)

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

jest.mock('@/database/MongoDB.class', () => {
  return {
    MongoDB: jest.fn().mockImplementation(() => mongoDBStub) // Return the stub instance
  }
})

describe('Test for BookServices', () => {
  let bookServices: BookServices

  beforeEach(() => {
    bookServices = new BookServices()
    jest.clearAllMocks()
  })

  describe('check service collection', () => {
    test('should set the correct collection name books', () => {
      expect(bookServices.collection).toBe('books')
    })
  })

  describe('getAllBooks', () => {
    test('should return all books', async () => {
      const result = await bookServices.getAllBooks()
      expect(result.length).toEqual(mockBooks.length)
      expect(result).toEqual(mockBooks)
    })
  })

  describe('getOneBook', () => {
    test('should return a book by id', async () => {
      const id = mockBooks[0]._id.toHexString()
      const result = await bookServices.getOneBook(id)
      expect(result).toEqual(mockBooks[0])
    })

    test('should return null if no book is found', async () => {
      const id = '66b779b95b003f231c8f229b'
      const result = await bookServices.getOneBook(id)
      expect(result).toBeNull()
    })
  })
})
