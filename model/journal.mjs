import mongoose from "mongoose"

const journalSchema = new mongoose.Schema({

    userReference: {
        type: String, // User email as unique identifier 
        required: true, 
        index: true // Adding index
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

// Compound index on userReference and createdAt for faster queries with a unique name
journalSchema.index({ userReference: 1, createdAt: -1 }, { name: "userReference_createdAt_index" });

const Journal = mongoose.model('journal', journalSchema)

export default Journal