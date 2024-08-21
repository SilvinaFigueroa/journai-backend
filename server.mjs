import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database.mjs'
import userRoutes from './routes/user.mjs'
import journalRoutes from './routes/journal.mjs'
import loginRoutes from './routes/login.mjs'
import apiRoutes from './routes/api.mjs'
import allowCors from './allowCors.mjs'

const app = express()
dotenv.config();

const frontendURL = 'https://journai-frontend.vercel.app'


// Use CORS middleware
app.use(cors({
    origin: frontendURL,
    credentials: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, x-auth-token',
  }))


// // Middleware to apply CORS to all routes
// app.use((req, res, next) => allowCors((req, res) => next(), frontendURL)(req, res))

// // Cross-Origin Resource Sharing - interactions between different origins (domains)
// app.use(cors({
//     origin: frontendURL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
//     credentials: true,
//     optionsSuccessStatus: 200
// }))


// // Handle OPTIONS requests
// // app.options('*', cors()); // Respond to preflight requests

// // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests
// app.options('*', (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', frontendURL);
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
// })

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

app.listen(PORT || 4000, ()=>{
    console.log(`Server listening on port ${PORT}`)
})