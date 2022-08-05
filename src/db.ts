import { DataSource } from 'typeorm'
import { ConfigDB } from './config/db'
import User from './entities/user'

const AppDateSource = new DataSource({
  ...ConfigDB,
  entities: [User]
})

export default AppDateSource
