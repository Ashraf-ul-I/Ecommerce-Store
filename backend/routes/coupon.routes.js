import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware';
import { getCoupon } from '../controllers/coupon.controller';

const router=express.Router();

router.get("/",protectRoute,getCoupon);
router.get("/validate",protectRoute,validateCoupon);

export default router;