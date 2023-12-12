import express from 'express';
import { pageController } from '../controllers/index.js';
import { authValidate, pageValidate } from '../validations/index.js';
import { validateReq, validateToken } from '../middlewares/validate.js';
import coverRoutes from './coverRoutes.js';

const router = express.Router();

router.post(
  '/save',
  validateToken(authValidate.tokenSchema),
  validateReq(authValidate.pageSchema),
  pageController.savePage
);

router.get(
  '/getAllPages',
  validateToken(authValidate.tokenSchema),
  pageController.getPages
);

router.get(
  '/getPage',
  validateToken(authValidate.tokenSchema),
  pageController.getPage
);

router.post(
  '/createPage',
  validateToken(authValidate.tokenSchema),
  validateReq(pageValidate.createPageSchema),
  pageController.createPage
);

router.use('/cover', coverRoutes);

export default router;
