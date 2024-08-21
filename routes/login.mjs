import express from 'express'
import { check } from 'express-validator'

// Controller (routes logic)
import login from '../controllers/loginControllers.mjs'

// Express Router
const router = express.Router()

router.post('/', [
    // Validation array: check(parameter, error message).validation function()
    check('email', "Include a valid email").isEmail(),
    check('password', "Enter a password with 8 or more characters").isLength({min: 8})
    ], login.userLogin)

export default router