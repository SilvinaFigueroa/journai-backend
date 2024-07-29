import express from 'express'
import auth from '../middleware/auth.mjs'

// Express Router
const router = express.Router()
// Controller (routes logic)
import JournalCRUD from '../controllers/journalControllers.mjs'


router.get('/', (req, res) => res.send('Testing Journal Route'))


    // Creating a jounal entry using the user email to asociate it with the user account
router.post('/new/', auth, JournalCRUD.CreateJournal) 

router.put('/update/:id', auth, JournalCRUD.UpdateJournal)

router.get('/info/:id', auth, JournalCRUD.InfoJournal)

router.delete('/delete/:id', auth, JournalCRUD.DeleteJournal)


export default router