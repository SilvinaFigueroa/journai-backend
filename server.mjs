import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.mjs'
import userRoutes from './routes/user.mjs'
import journalRoutes from './routes/journal.mjs'
import loginRoutes from './routes/login.mjs'
import apiRoutes from './routes/api.mjs'
import cors from 'cors'

const app = express()
dotenv.config();

const frontendURL = process.env.WEBSITE_URL

app.use(cors({
    origin: frontendURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
    credentials: true
}))

// Parses incoming requests with URL-encoded (for instance, forms)
app.use(express.urlencoded({ extended: false }))
// Parse request Object as a JSON Object
app.use(express.json())

//Connect Database
connectDB()

// Testing Route
app.get('/', (req, res) => {
    res.send("Express route working")
})

// Serve static files
app.use(express.static('public'))

// Routes 
app.use('/user', userRoutes)
app.use('/journal', journalRoutes)
app.use('/login', loginRoutes)
app.use('/api', apiRoutes)


// Server Connection 
dotenv.config()
const PORT = process.env.PORT

app.listen(PORT || 4000, () => {
    console.log(`Server listening on port ${PORT}`)
})