import mongoose from "mongoose"
import isEmail from 'validator/lib/isEmail.js' // https://www.npmjs.com/package/validator


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

    password: {
        type: String,
        required: true,
        minLength: 6,
    },

    email: {
        type: String,
        required: true,
        validate: [isEmail, "Invalid Email"],
        unique: true,
        index: { unique: true, name: "email_index" } // Adding index with a unique name
    },
    location: {
        type: String,
        required: true
    }

})


const User = mongoose.model('user', userSchema)

export default User
