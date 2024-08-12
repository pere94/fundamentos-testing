import { MongoDB } from '@/database/MongoDB.class'
import { type Book } from '../entity/Book.class'

class BookServices {
  private readonly _collection: string
  private readonly _mongoDB: MongoDB

  constructor () {
    this._collection = 'books'
    this._mongoDB = new MongoDB()
  }

  async getAllBooks (): Promise<Book[]> {
    return await this._mongoDB.getAll<Book>(this._collection)
  }

  async getOneBook (id: string): Promise<Book | null> {
    try {
      if (!id) {
        throw new Error('Id is required')
      }
      const book = await this._mongoDB.getOneById<Book>(this._collection, id)
      return book ?? null
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  async setManyBooks (books: Book[]): Promise<void> {
    try {
      if (!books || books.length === 0) {
        throw new Error('Books are required')
      }
      await this._mongoDB.setMany<Book>(this._collection, books)
    } catch (error) {
      await Promise.reject(error)
    }
  }

  get collection (): string {
    return this._collection
  }
}

export { BookServices }
