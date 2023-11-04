import express from 'express'
import { authController } from '../controllers/index.js'
import { createUserSchema } from '../validations/userValidations.js'
import validateReq from '../middlewares/validate.js'
const router = express.Router()

router.post('/register', validateReq(createUserSchema), authController.register)
router.post('/login', authController.login)
export default router