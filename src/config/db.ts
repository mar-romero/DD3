
import 'dotenv/config'
import { DataSourceOptions } from 'typeorm'

export const { TIME_CHANGE_WORD, USER_ATTEMPTS } = process.env

const {
  DBHOST, DBUSERNAME, DBPASSWORD, DBPORTS, DBDATABASE
} = process.env

const DB_TYPE = 'postgres'
const DB_HOST = DBHOST
const DB_USERNAME = DBUSERNAME
const DB_PASSWORD = DBPASSWORD
const DB_PORT = DBPORTS === null ? parseInt(DBPORTS, 10) : 5432
const DB_DATABASE = DBDATABASE

export const ConfigDB: DataSourceOptions = {
  type: DB_TYPE,
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE,
  entities: [],
  logging: true,
  synchronize: true

}
