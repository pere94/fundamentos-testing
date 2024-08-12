import { type Book } from '@/modules/books/entity/Book.class'
import { faker } from '@faker-js/faker'
import { ObjectId } from 'mongodb'

export const createBooksFake = (count: number): Book[] => {
  return Array.from({ length: count }, () => ({
    _id: new ObjectId(),
    name: faker.commerce.productName()
  }))
}
