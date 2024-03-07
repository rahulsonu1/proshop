import express from 'express'
const router=express.Router()
import userController from '../controller/userController.js'
import { protect } from '../config/authMiddleware.js'


router.post('/login',userController.login)
router.get('/profile',protect,userController.getUserProfile)
router.post('/',userController.register)

export default router