import express from 'express'
import { BookServices } from '../services/books.service'
const bookRouter = express.Router()

const bookServices = new BookServices()

// define the home page route
bookRouter.get('/', (req, res) => { // Marca la función como 'async'
  bookServices.getAllBooks()
    .then((books) => res.send({ message: 'Success', data: books }))
    .catch((error) => res.send({ message: error?.message ?? 'Error', data: [] }))
})

bookRouter.get('/:id', (req, res) => {
  const id = req?.params?.id || ''
  if (id === '') {
    res.send({ message: 'Id is required', data: null })
    return
  }
  bookServices.getOneBook(id)
    .then((book) => res.send({ message: 'Success', data: book }))
    .catch((error) => res.send({ message: error?.message ?? 'Error', data: null }))
})

bookRouter.get('/about', (req, res) => {
  res.send('About birds')
})

export { bookRouter }
