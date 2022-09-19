import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
import process from 'process'

dotenv.config()

const uri = process.env.MONGODB_URI

const resetDB = async () => {
  let client
  try {
    const mongoClient = new MongoClient(uri, {})
    client = await mongoClient.connect()
  } catch (error) {
    console.log('Connection error:', error.message)
    process.exit(1)
  }

  const db = client.db('graphql_api_db')
  const todos = db.collection('todos')
  try {
    await todos.deleteMany({})
    await client.close()
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

resetDB()
