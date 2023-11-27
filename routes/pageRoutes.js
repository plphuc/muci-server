import express from 'express'
import {validateReq} from '../middlewares/validate.js'
const router = express.Router()

// USED TO CHECK IF USER IS LOGGED IN
router.get('/data', (req, res) => {
  res.send(JSON.stringify({'hello': 'world'}))
})


// router.get('/pages', validateReq(authValidate.register), authController.register)

export default router