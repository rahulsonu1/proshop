import express from 'express'
const router=express.Router()
import productController from '../controller/productController.js'
import {protect,admin} from '../config/authMiddleware.js'

router.get('/',productController.getProduct)
router.get('/:id',productController.getProductById)
router.delete('/:id',protect,admin,productController.deleteProduct)

router.post('/',protect,admin,productController.createProduct)
router.put('/:id',protect,admin,productController.updateProduct)
router.post('/:id/reviews',protect,productController.createProductReview)


export default router