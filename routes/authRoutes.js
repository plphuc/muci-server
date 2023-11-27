import express from 'express';
import { authController } from '../controllers/index.js';
import * as authValidate from '../validations/authValidation.js';
import { validateReq } from '../middlewares/validate.js';
const router = express.Router();

router.post(
  '/register',
  validateReq(authValidate.register),
  authController.register
);
router.post('/login', validateReq(authValidate.login), authController.login);

export default router;
