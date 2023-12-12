import express from "express"
import { coverController, userController } from '../controllers/index.js';
import { upload } from "../services/coverServices.js";

const router = express.Router()

router.post('/save', upload.single("file"), function (req, res, next) {
  userController.assignUserId(req, res, next);
  coverController.saveCover(req, res, next)
})

export default router