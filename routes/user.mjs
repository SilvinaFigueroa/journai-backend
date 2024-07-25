import express from 'express'

// Express Router
const router = express.Router()
// Controller (routes logic)
import userCRUD from '../controllers/userControllers.mjs'


router.get('/', (req, res) => res.send('Testing user Route'))

router.post('/new', userCRUD.CreateUser)

router.put('/update/:id', userCRUD.UpdateUser)

router.get('/info/:id', userCRUD.InfoUser)

router.delete('/delete/:id', userCRUD.DeleteUser)


export default router