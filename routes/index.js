import saveImgRouter from './saveImgRouter.js';
import authRouter from './authRoutes.js'

import express from 'express'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter
  },
]
defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router