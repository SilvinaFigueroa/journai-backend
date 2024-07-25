import User from "../model/user.mjs"
import Journal from "../model/journal.mjs"


// Controller functions

const CreateUser = [
    // Validation array: check(parameter, error message).validation function()
    check('firstName', 'First name is required').not().isEmpty(),
    check('LastName', 'Last name is required').not().isEmpty(),
    check('Location', 'Location is required').not().isEmpty(),
    check('email', "Include a valid email").isEmail(),
    check('password', "Enter a password with 8 or more characters").isLength({min: 8})]
    
    async (req, res) => {
    // destructure request 
    const { firstName, lastName, password, email, location } = req.body
    console.log(`firstName ${firstName} lastName ${lastName} password ${password} email ${email} location ${location}`)

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
export default { CreateUser, UpdateUser, InfoUser, DeleteUser}