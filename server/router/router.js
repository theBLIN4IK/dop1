import { Router } from 'express'
import MembersController from '../controllers/Controller.js'

const router = Router()

router.get('/getMembers', MembersController.getMembers)

export default router
