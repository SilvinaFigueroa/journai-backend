import express from 'express'

// Express Router
const router = express.Router()
// Controller (routes logic)
import Login from '../controllers/loginControllers.mjs'



router.post('/', Login.userLogin)



export default router