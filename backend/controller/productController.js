import asyncHandler from 'express-async-handler'
import Product from '../model/product.js'


const getProduct= asyncHandler( async(req,res)=>{
   const products=await Product.find()
   return res.json(products)
})

const getProductById=asyncHandler(async function(req,res){
    const product=await Product.findById(req.params.id)
    if(product){
        return res.json(product)
    }else{
        // return res.status(404)
        throw new Error('Product not found')
    }
})


export default {getProduct,getProductById}


