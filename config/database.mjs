import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const database = process.env.mongoURI

const connectDB = async () => {

    try {
        // moongose.set('strictQuery', true) // Uncomment after creating the schema
        await mongoose.connect(database)
        console.log(`Mongo Database Connected`)
        
    } catch (err) {
        console.error(err.message)
        process.exit(1) // terminate process https://nodejs.org/api/process.html#process_process_exit_code
    }

}

export default connectDB
