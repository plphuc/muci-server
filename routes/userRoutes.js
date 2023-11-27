import express from 'express'
import { userController } from '../controllers/index.js'
import * as authValidate from '../validations/authValidation.js'
import {validateToken} from '../middlewares/validate.js'
const router = express.Router()

router.get('/getUser', validateToken(authValidate.getUser), userController.getUser)

export default router