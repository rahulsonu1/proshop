import express from 'express'
const router=express.Router()
import userController from '../controller/userController.js'
import { protect,admin} from '../config/authMiddleware.js'


router.post('/login',userController.login)
router.get('/profile',protect,userController.getUserProfile)
router.post('/',userController.register)
router.put('/profile',protect,userController.updateUserProfile)

router.get('/',protect,admin,userController.getUser)


export default router