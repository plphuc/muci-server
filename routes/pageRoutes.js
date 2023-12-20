import express from 'express';
import { pageController } from '../controllers/index.js';
import { authValidate, pageValidate } from '../validations/index.js';
import { validateReq, validateToken } from '../middlewares/validate.js';
import coverRoutes from './coverRoutes.js';

const router = express.Router();

router.get(
  '/getAllPages',
  validateToken(authValidate.tokenSchema),
  pageController.getAllPages
);

router.get(
  '/getPageById',
  validateToken(authValidate.tokenSchema),
  validateReq(pageValidate.getPageByIdSchema),
  pageController.getPageById
);

router.post(
  '/',
  validateToken(authValidate.tokenSchema),
  pageController.addPage
);

router.put(
  '/',
  validateToken(authValidate.tokenSchema),
  validateReq(pageValidate.getPageByIdSchema),
  validateReq(pageValidate.updatePageSchema),
  pageController.updatePage
)

router.use('/cover', coverRoutes);

export default router;
