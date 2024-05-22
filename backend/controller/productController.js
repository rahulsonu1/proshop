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
         res.status(404)
        throw new Error('Product not found')
    }
})
const deleteProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findByIdAndDelete(req.params.id)
    if(product){
        res.json({message:"Product removed"})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProduct=asyncHandler(async(req,res)=>{
    const product=new Product({
        name:'Sample name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews:0,
        description:'sample description'
    })
    const createdProduct=await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct=asyncHandler(async(req,res)=>{
    const {name,price,description,image,brand,category,countInStock}=req.body
    const product=await Product.findById(req.params.id)
    if(product){
        product.name=name,
        product.price=price,
        product.image=image,
        product.brand=brand,
        product.category=category,
        product.countInStock=countInStock,
        product.description=description
        const updatedProduct=await product.save()
    res.status(201).json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product not Found')
    }

})

const createProductReview=asyncHandler(async(req,res)=>{
    let {rating,comment}=req.body
     console.log(rating,comment)

    const product=await Product.findById(req.params.id)
    if(product){
        const alreadyReviewed=product.reviews.find((r)=>r.user.toString()===req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }
        const review={
            name:req.user.name,
            rating:parseInt(rating, 10),
            comment,
            user:req.user._id
        }
        product.reviews.push(review)
        product.numReviews=product.reviews.length
        product.rating=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length
        await product.save()
        res.status(201).json({message:"Review added"})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})



export default {getProduct,getProductById,deleteProduct,createProduct,updateProduct,createProductReview}


