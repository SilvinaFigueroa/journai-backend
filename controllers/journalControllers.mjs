import Journal from "../model/journal.mjs"


// Controller functions

// TODO: VALIDATE THAT USER EMAIL IS PASSED ON PARAMS 
const CreateJournal = async (req, res) => {

    // destructure request 
    const { email, content, weatherData, inputMood, location } = req.body

    console.log(`userEmail ${email} content ${content} inputMood ${inputMood} weatherData ${weatherData} location ${location}`)

    try {
        // create Journal 
        let journal = new Journal({
            userReference : email,
            content,
            weatherData,
            inputMood,
            location
        })
        // saving user created 
        await journal.save()

        res.send("Journal Created")

    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: `Server Error` })

    }
}

// TODO: GET THE JOURNAL ID ON PARAMS 
const UpdateJournal = async (req, res) => {

    // destructure request 
    const journalID = req.params.id
    const { content, inputMood, location } = req.body
    console.log(`content ${content} inputMood ${inputMood} location ${location}`)

    try {
        // Check if any of the fields was updated
        if (!content && !inputMood && !location) res.send("There is no new data to update")

        // Add updated fields to an obj to set the new values on the Journal entry
        const updatedFields = {}
        if (content) updatedFields.content = content
        if (inputMood) updatedFields.inputMood = inputMood
        if (location) updatedFields.location = location

        // update the journal by ID setting the values updated (updatedFields obj)
        const updateJournal = await Journal.findByIdAndUpdate(journalID, updatedFields,
            { new: true }) // new : true -> returns the updated Journal 
        console.log(updateJournal)

        res.status(201).json({ msg: `Journal ${journalID} Updated` })


    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: `Server Error` })

    }
}

const InfoJournal = async (req, res) => {
    try {
        const journalID = req.params.id
        const journalData = await Journal.findOne({ _id: journalID })

        res.json(journalData)

    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: `Server Error` })
    }
}

// TODO: DELETE ALL THE JOURNALS ASSOCIATED TO THE USER 

const DeleteJournal = async (req, res) => {

    try {
        const journalID = req.params.id
        await Journal.findByIdAndDelete({ _id: journalID })

        res.status(200).json({ msg: "Journal Deleted" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: `Server Error` })
    }
}



// exporting all the controller funtions as one object to use dot notation and access them
export default { CreateJournal, UpdateJournal, InfoJournal, DeleteJournal }