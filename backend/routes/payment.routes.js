import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware';

import dotenv from 'dotenv';
import { createCheckoutSession,checkoutSuccess } from '../controllers/payment.Controller.js';

dotenv.config();

const router=express.Router();

router.post('/create-checkout-session',protectRoute,createCheckoutSession);

router.post('/checkout-success',protectRoute,checkoutSuccess);


export default router;