import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },

    lastName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },

    email: {
        type: String,
        required: true,
        validate: [isEmail, "Invalid Email"],
        unique: true
    },
    location: {
        type: String,
        required: true
    }

})


const User = mongoose.model('user', userSchema)

export default User
