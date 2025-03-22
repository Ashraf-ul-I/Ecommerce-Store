import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { addToCart, removeAllFromCart, updateQuantity,getCartProducts } from '../controllers/cart.controller.js';

const router=express.Router();

router.get('/',protectRoute,getCartProducts);
router.post('/',protectRoute,addToCart);
router.delete('/:id',protectRoute,removeAllFromCart);
router.put('/:id',protectRoute,updateQuantity);

export default router;