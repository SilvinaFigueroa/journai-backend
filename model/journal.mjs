import mongoose from "mongoose"

const journalSchema = new mongoose.Schema({

    userReference: {
        type: String, // User email as unique identifier 
        required: true, 
    }, 
    
    content:{
        type: String,
        required: true

    },

    weatherData: {
        type: String
    }, 

    inputMood: {
        type: String,
        required: true

    },

    location: {
        type: String,
        required: true
    }

}, { timestamps: true } )

const Journal = mongoose.model('journal', journalSchema)

export default Journal