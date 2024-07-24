import express from 'express'

// Express Router
const router = express.Router()
// Controller (routes logic)
import JournalCRUD from '../controllers/journalControllers.mjs'


router.get('/', (req, res) => res.send('Testing Journal Route'))


    // Creating a jounal entry using the user email to asociate it with the user account
router.post('/new/:email', JournalCRUD.CreateJournal) 

router.put('/update/:id', JournalCRUD.UpdateJournal)

router.get('/info/:id', JournalCRUD.InfoJournal)

router.delete('/delete/:id', JournalCRUD.DeleteJournal)



export default router