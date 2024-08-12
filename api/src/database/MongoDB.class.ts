import { type Db, type Filter, MongoClient, ObjectId, type OptionalUnlessRequiredId, ServerApiVersion, type WithId } from 'mongodb'
import { EnviromentVariablesConfig } from '../config/EnviromentVariablesConfig.config'

export type Document = Record<string, any>

class MongoDB {
  private readonly client: MongoClient
  private readonly dbName: string
  private static connection: Db | null = null

  constructor () {
    const databaseUrl = EnviromentVariablesConfig.env === 'test'
      ? EnviromentVariablesConfig.databaseUrlTest ?? ''
      : EnviromentVariablesConfig.databaseUrl ?? ''
    const dbName = EnviromentVariablesConfig.env === 'test'
      ? EnviromentVariablesConfig.dbNameTest ?? ''
      : EnviromentVariablesConfig.dbName ?? ''

    this.client = new MongoClient(databaseUrl, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.dbName = dbName
  }

  async connect (): Promise<Db> {
    if (MongoDB.connection === null) {
      await this.client.connect()
      MongoDB.connection = this.client.db(this.dbName)
      return MongoDB.connection
    }
    return MongoDB.connection
  }

  async getAll<T extends Document>(collection: string, query: Filter<T> = {}): Promise<Array<WithId<T>>> {
    try {
      const db = await this.connect()
      return await db.collection<T>(collection).find(query).toArray()
    } catch {
      return []
    }
  }

  async getOneById<T extends Document>(collection: string, id: string): Promise<WithId<T> | null> {
    try {
      const db = await this.connect()
      const filter = { _id: new ObjectId(id) }
      return await db.collection<T>(collection).findOne<WithId<T>>(filter as Filter<T>)
    } catch {
      return null
    }
  }

  async setMany<T extends Document>(collection: string, documents: Array<OptionalUnlessRequiredId<T>>): Promise<void> {
    if (!documents || documents.length === 0 || !collection) { return }
    try {
      const db = await this.connect()
      const result = await db.collection<T>(collection).insertMany(documents)
      console.log('🚀 ~ MongoDB ~ result:', result)
    } catch (error) {
      console.log('🚀 ~ MongoDB ~ error:', error)
    }
  }

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}

export { MongoDB }
