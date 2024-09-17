import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import { router } from './routes'
import { dbConnect } from './config/mongodb.config'

const PORT = process.env.PORT ?? 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

const startServer = async (): Promise<void> => {
  try {
    await dbConnect() // No necesitas asignarlo a una variable si no usarás el valor
    console.log('Database connection successful')
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

void startServer()
