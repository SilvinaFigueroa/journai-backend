import mongoose from "mongoose"

const journalSchema = new mongoose.Schema({

    userReference: {
        type: String, // User email as unique identifier 
        required: true, 
    }, 
    
    content:{
        type: String
    },

    weatherData: {
        type: String
    }, 

    inputMood: {
        type: String
    },

    location: {
        type: String,
        require: true
    }

}, { timestamps: true } )

const Journal = mongoose.model('journal', journalSchema)

export default Journal