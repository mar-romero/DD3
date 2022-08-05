import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/userRoutes'
const app = express()

dotenv.config()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/user', userRoutes)
export default app
