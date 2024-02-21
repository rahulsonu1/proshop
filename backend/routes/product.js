import express from 'express'
const router=express.Router()
import productController from '../controller/productController.js'

router.get('/',productController.getProduct)
router.get('/:id',productController.getProductById)


export default router