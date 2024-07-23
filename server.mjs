import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database.mjs'

const app = express()


// Middleware
    // Cross-Origin Resource Sharing - interactions between different origins (domains) - 
    app.use(cors())
    // Parses incoming requests with URL-encoded (for instance, forms)
    app.use(express.urlencoded({extended : false}))

//Connect Database
    connectDB()

app.get('/', (req, res)=> {
    res.send("Express route working")
})


// Server Connection 

dotenv.config()
const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})