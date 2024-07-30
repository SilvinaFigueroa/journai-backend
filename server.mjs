import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database.mjs'
import userRoutes from './routes/user.mjs'
import journalRoutes from './routes/journal.mjs'
import loginRoutes from './routes/login.mjs'
import apiRoutes from './routes/api.mjs'


const app = express()

// Middleware
    // Cross-Origin Resource Sharing - interactions between different origins (domains) - 
    app.use(cors({
        origin: 'http://localhost:5173', 
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type,Authorization,x-auth-token'
    }))

    // Parses incoming requests with URL-encoded (for instance, forms)
    app.use(express.urlencoded({extended : false}))
    // Parse request Object as a JSON Object
    app.use(express.json())

//Connect Database
    connectDB()


// Testing Route
app.get('/', (req, res)=> {
    res.send("Express route working")
})


// Routes 
app.use('/user', userRoutes)
app.use('/journal', journalRoutes)
app.use('/login', loginRoutes)
app.use('/api', apiRoutes)



// Server Connection 
dotenv.config()
const PORT = process.env.PORT

app.listen(PORT || 4000, ()=>{
    console.log(`Server listening on port ${PORT}`)
})