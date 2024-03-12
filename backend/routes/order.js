import express from 'express'
const router=express.Router()
import { protect } from '../config/authMiddleware.js'

import orderController from '../controller/orderController.js'


router.get('/myorders',protect,orderController.getMyOrder)
router.post('/',protect,orderController.addOrderItems)
router.get('/:id',protect,orderController.getOrderById)
// router.put('/:id/pay',protect,orderController.updateOrderTOPaid)

router.get('/myorders',protect,orderController.getMyOrder)





export default router




