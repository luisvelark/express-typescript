import 'dotenv/config'
import mongoose, { connect } from 'mongoose'

async function dbConnect (): Promise<void> {
  mongoose.set('strictQuery', false)
  const DB_URI = process.env.DB_URI as string
  await connect(DB_URI)
}

export { dbConnect }
