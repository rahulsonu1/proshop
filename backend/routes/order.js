import express from 'express'
const router=express.Router()
import { protect } from '../config/authMiddleware.js'

import orderController from '../controller/orderController.js'

router.post('/',protect,orderController.addOrderItems)
router.get('/:id',protect,orderController.getOrderById)



export default router




