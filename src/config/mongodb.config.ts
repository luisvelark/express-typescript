import 'dotenv/config'
import mongoose, { connect } from 'mongoose'

async function dbConnect (): Promise<void> {
  mongoose.set('strictQuery', false)
  const DB_URI = process.env.DB_URI as string
  // const DB_URI = 'mongodb://127.0.0.1:27017/api-rest-ts'
  await connect(DB_URI)
}

export { dbConnect }
