import User from "../model/user.mjs"


// Controller functions

const CreateUser = async (req, res) => {
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
        res.status(200).json({msg : "User Created"})


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

        // update the user by ID passing the values updated (updatedFields obj)
        const updateUser = await User.findByIdAndUpdate(userId, updatedFields,
            { new: true }) // new : true -> returns the updated user 

        res.json(updateUser)
        res.status(201).json({msg : "User Updated"})


    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: `Server Error` })

    }
}

// TODO : ADD THE JOURNALS INFO PER USER 

const InfoUser = async (req, res) => {

    const userId = req.params.id
    const userData = await findOne({ _id: userId })

    res.json(userData)
}

// TODO: DELETE ALL THE JOURNALS ASSOCIATED TO THE USER 

const DeleteUser = async (req, res) => {

    const userId = req.params.id
    await findAndDelete({ _id: userId })

    res.status(200).json({msg : "User Deleted"})

}



// exporting all the controller funtions as one object to use dot notation and access them
export default { CreateUser, UpdateUser, InfoUser, DeleteUser}