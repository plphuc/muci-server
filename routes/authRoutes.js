import express from 'express'
import { authController } from '../controllers/index.js'
import { createUserSchema } from '../validations/userValidations.js'
const router = express.Router()

router.post('/register', authController.register)

export default router