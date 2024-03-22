import express from 'express'
const router=express.Router()
import { protect,admin } from '../config/authMiddleware.js'

import orderController from '../controller/orderController.js'


router.get('/myorders',protect,orderController.getMyOrder)
router.post('/',protect,orderController.addOrderItems)
router.get('/:id',protect,orderController.getOrderById)
// router.put('/:id/pay',protect,orderController.updateOrderTOPaid)

router.get('/myorders',protect,orderController.getMyOrder)
router.get('/',protect,admin,orderController.getOrders)
router.put('/:id/deliver',protect,admin,orderController.updateOrderToDelivered)




export default router




