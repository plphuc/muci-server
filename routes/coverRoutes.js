import express from "express"
import { coverController, userController } from '../controllers/index.js';
import { validateReq, validateToken } from "../middlewares/validate.js";
import { authValidate, coverValidate, pageValidate } from "../validations/index.js";

const router = express.Router()

// router.post('/save', upload.single("file"), function (req, res, next) {
//   userController.assignUserId(req, res, next);
//   coverController.saveCover(req, res, next)
// })

router.post(
  '/add', 
  validateToken(authValidate.tokenSchema),
  validateReq(pageValidate.getPageByIdSchema),
  validateReq(coverValidate.addCoverSchema),
  coverController.addCover
  )
export default router