import express from 'express'
import User from '../model/user.mjs'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {check, validationResult } from 'express-validator'
import isEmail from 'validator/lib/isEmail'


const router = express.Router()


const userLogin = [
    // Validation array: check(parameter, error message).validation function()
    check('email', "Include a valid email").isEmail(),
    check('password', "Enter a password with 8 or more characters").isLength({min: 8})]

    async (req, res)=> {

    // Include errors on a variable 
    const errors = validationResult(req)

    // If there are errors, send them as status 400 error
    if(!errors.isEmpty){
        return res.status(400).json({ errors : errors.array() })
    }

    //Destructure the request 
    const {email, password} = req.body

    try {

        // Check if user exist using the email 
        let user = await User.findOne( {email} )
        // return error if user doesn't exist 
        if(!user){
            return res.status(400).json({errors : [{msg : "Invalid Credentials"}] })
        }

        // if user exist, check if the password match 
        // password = password enter by the user
        // user.password = password store in the database for that user 

        const isMatch = await bcrypt.compare(password, user.password)

        //return error if password doesn't match
        if(!isMatch){
            return res.status(400).json({error : [{msg : 'Invalid Credentials'}] })
        }

        // create a jwt payload
        const payload ={
            user : {
                id : user._id
            }
        }

        // sign and send jwt in response 
        jwt.sign(
            payload,
            process.env.jwtSecret,
            {expiresIn: 3600}, (err, token)=>{
                if (err) throw err
                // if there is no error send token
                res.json(token)
            }
        )

    } catch (err) {
        console.error(err)
        res.status(500).json({errors : [{msg : 'Server Error'}] })
        
    }

}

export default userLogin


