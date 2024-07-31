import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database.mjs'
import userRoutes from './routes/user.mjs'
import journalRoutes from './routes/journal.mjs'
import loginRoutes from './routes/login.mjs'
import apiRoutes from './routes/api.mjs'


const app = express()

dotenv.config();



// Middleware
// Cross-Origin Resource Sharing - interactions between different origins (domains) - 


const allowedOrigins = [process.env.LOCALHOST_URL, process.env.PRODUCTION_URL];


app.use(cors({
    origin: function (origin, callback) {
        console.log('Request Origin:', origin)

        // Allow requests with no origin
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
    credentials: true
}));

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