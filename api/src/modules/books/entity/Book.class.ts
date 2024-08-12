import { type ObjectId } from 'mongodb'

class Book {
  _id: ObjectId
  name: string

  constructor (_id: ObjectId, name: string) {
    this._id = _id
    this.name = name
  }

  // Si necesitas implementar otras propiedades de Document o métodos, puedes hacerlo aquí
}

// Exporta la entidad Book
export { Book }
