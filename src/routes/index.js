
import authRouter from './authRouter.js';
import utilRouter from './utilsRouter.js';
import walletRouter from './walletRouter.js';
import express from 'express';

const router = express.Router()
router.use(authRouter)
router.use(walletRouter)
router.use(utilRouter)
export default router;