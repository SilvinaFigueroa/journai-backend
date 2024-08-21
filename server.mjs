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

// // Middleware to apply CORS custom function to all routes
// app.use((req, res, next) => allowCors(next, frontendURL)(req, res));

// Apply CORS Middleware
app.use(cors({
    origin: frontendURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
    credentials: true
}));

// Handle preflight `OPTIONS` requests globally
app.options('*', (req, res) => {
    console.log('Received OPTIONS request for:', req.path);  // Log the request path
    console.log('Origin:', req.headers.origin);              // Log the request origin
    console.log('Requested Method:', req.headers['access-control-request-method']) // Log the requested method
    console.log('Requested Headers:', req.headers['access-control-request-headers']) // Log the requested headers

    res.setHeader('Access-Control-Allow-Origin', frontendURL)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token')
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    console.log('Responding with 200 OK and CORS headers') // Log the response action
    res.sendStatus(200); // Respond with HTTP 200 status
})
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests


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