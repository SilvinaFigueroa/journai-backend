import express from 'express'

// Express Router
const router = express.Router()
// User model schema
import User from '../model/user.mjs'


// @route: GET /users
// @description: Test Route
// @access: Public 

router.get('/', (req, res) => res.send('Testing user Route'))

// @route: POST /users
// @description: create an user 
// @access: Public 

router.post('/', async (req, res) => {

    // destructure request 
    const { firstName, lastName, password, email, location } = req.body
    console.log(`firstName ${firstName} 
                lastName ${lastName} 
                password ${password}
                email ${email}
                location ${location}`)

    try {

        // create user 
        let user = new User({
            firstName,
            lastName,
            password,
            email,
            location
        })
        // saving user created 
        await user.save()

        res.send("User Created")

    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: `Server Error` })

    }
})

export default router