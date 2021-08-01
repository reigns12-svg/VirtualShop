import express from 'express'
import { deleteProduct, getProductById, getProducts, updateProduct, createProduct, createProductReview, getTopProducts } from '../controllers/productControllers.js'
import {protect,admin} from '../midleware/authMiddleware.js'

const router = express.Router()

router.get('/top',getTopProducts)
router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/:id/reviews').post(protect,createProductReview)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)


export default router