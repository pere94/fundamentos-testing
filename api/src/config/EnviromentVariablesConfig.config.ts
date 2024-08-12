import dotenv from 'dotenv'

dotenv.config()

export const EnviromentVariablesConfig = {
  env: process.env.NODE_ENV ?? 'dev',
  port: process.env.APP_PORT ?? 3000,
  databaseUrl: process.env.MONGODB_URL,
  dbName: process.env.MONGODB_DBNAME,
  jwtSecret: process.env.JWT_SECRET,
  dbNameTest: process.env.MONGODB_DBNAME_TEST,
  databaseUrlTest: process.env.MONGODB_URL_TEST
}
