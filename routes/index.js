import saveImgRouter from './saveImgRouter.js';
import authRouter from './authRoutes.js';
import pageRouter from './pageRoutes.js';
import userRouter from './userRoutes.js';

import express from 'express';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/pages',
    route: pageRouter,
  },
  {
    path: '/user',
    route: userRouter,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
