import jwt from 'jsonwebtoken'
import User from '../model/user.js'
import asyncHandler from 'express-async-handler'



const protect= asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization 
        // && req.headers.authorization.startsWith('Bearer')
    ){
        try {
            token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            console.log(decoded)
            req.user=await User.findById(decoded.id).select('-password')
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorised,token failed')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorised,No Token')
    }
    next()
})

const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as admin')
    }
}

export {protect,admin}