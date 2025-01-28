import express from "express";
import { getAllProducts,getFeaturedProducts,createProduct, deleteProduct, getRecomendedProducts, getProductsCategory, toggleFeaturedProducts } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
const router= express.Router();

router.get("/",protectRoute,adminRoute,getAllProducts);
router.get("/featured",getFeaturedProducts);
router.get("/category/:category",getProductsCategory);
router.get('recomendations',getRecomendedProducts);
router.post('/',protectRoute,adminRoute,createProduct);
router.patch('/:id',protectRoute,adminRoute,toggleFeaturedProducts);
router.delete('/:id',protectRoute,adminRoute,deleteProduct);

export default router;