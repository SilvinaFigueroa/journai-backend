import User from "../model/user.mjs"
import Journal from "../model/journal.mjs"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'


// Controller functions

const CreateUser = [
    // Validation array: check(parameter, error message).validation function()
    check('firstName', 'First name is required').not().isEmpty(),
    check('LastName', 'Last name is required').not().isEmpty(),
    check('Location', 'Location is required').not().isEmpty(),
    check('email', "Include a valid email").isEmail(),
    check('password', "Enter a password with 8 or more characters").isLength({ min: 8 })]

async (req, res) => {

    // validate request
    const errors = validationResult(req) // check the request agains the validation array

    // if errors, send them as 400 error
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // destructure request 
    const { firstName, lastName, password, email, location } = req.body
    console.log(`firstName ${firstName} lastName ${lastName} password ${password} email ${email} location ${location}`)

    try {
        // check if user already exist 
        let findUser = await User.findOne({ email })
        if (findUser) {
            return res.status(400).json({ errors: [{ msg: 'User Already Exist' }] })
        }


        // create user if there is not errors 
        let user = new User({
            firstName,
            lastName,
            password,
            email,
            location
        })

        // password encryption - salt: no less than 6 and no more than 12
        const salt = await bcrypt.genSalt(10)

        // set the user password to the encrypted value
        user.password = await bcrypt.hash(password, salt)
        // saving user created 
        await user.save()

        // create payload for jwt 
        const payload = {
            user: {
                id: user.id,
                name: user.name
            }
        }
        // create the json web token 
        jwt.sign(
            payload,
            process.env.jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err

                res.json({ token })
            }
        )

        console.log('User Created')

    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: `Server Error` })
    }
}

// TODO: VALIDATE USING USER ID PARAMS OR EMAIL
const UpdateUser = async (req, res) => {

    // destructure request 
    const userId = req.params.id
    const { firstName, lastName, location } = req.body
    console.log(`User ID ${userId}, firstName ${firstName}, lastName ${lastName} , location ${location}`)

    try {
        // validate which fields are updated and create an updated elements object
        const updatedFields = {}
        if (firstName) updatedFields.firstName = firstName
        if (lastName) updatedFields.lastName = lastName
        if (location) updatedFields.location = location

        // update the user by ID setting the values updated (updatedFields obj)
        const updateUser = await User.findByIdAndUpdate(userId, updatedFields,
            { new: true }) // new : true -> returns the updated user 

        res.status(201).json({ msg: `User ${updateUser} Updated` })


    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: `Server Error` })

    }
}

// TODO : ADD THE JOURNALS INFO PER USER 

const InfoUser = async (req, res) => {
    try {
        const userId = req.params.id
        const userData = await User.findOne({ _id: userId })

        res.json(userData)
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: `Server Error` })
    }
}


const DeleteUser = async (req, res) => {

    const userId = req.params.id

    try {
        //Find user email with the user ID
        const userEmail = (await User.findOne({ _id: userId })).email

        // Use the user email to filter all the journals entry of that user and delete them
        const journalsDeleted = await Journal.deleteMany({ userReference: userEmail })

        // Delete the user
        const userDeleted = await User.findByIdAndDelete({ _id: userId })

        res.status(200).json({ msg: "User and Journals entry associated deleted" })

    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: `Server Error` })
    }
}

// exporting all the controller funtions as one object to use dot notation and access them
export default { CreateUser, UpdateUser, InfoUser, DeleteUser }