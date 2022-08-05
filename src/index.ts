import 'reflect-metadata'
import app from './app'
import AppDateSource from './db'

const PORT: number = 3000

async function main (): Promise<void> {
  try {
    await AppDateSource.initialize()
    console.log('Database connected')
    app.listen(PORT)
    console.log(`Server is listening on port ${PORT}`)
  } catch (error) {
    console.error('Unexpected Error: ', error)
  }
}

void main()
