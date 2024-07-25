import express from 'express'
import auth from '../middleware/auth.mjs'
import { check } from 'express-validator'


// Express Router
const router = express.Router()
// Controller (routes logic)
import userCRUD from '../controllers/userControllers.mjs'


router.get('/', (req, res) => res.send('Testing user Route'))


router.post('/new', 
    [check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    check('email', "Include a valid email").isEmail(),
    check('password', "Enter a password with 8 or more characters").isLength({ min: 8 })], 
    userCRUD.CreateUser)

router.put('/update/:id', auth, userCRUD.UpdateUser)
 
router.get('/info/:id', auth, userCRUD.InfoUser)

router.delete('/delete/:id', auth, userCRUD.DeleteUser)


export default router