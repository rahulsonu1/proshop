import express from 'express'
import dotenv from 'dotenv'
const app=express()
import products from './data/products.js'
import db from './config/mongoose.js'
dotenv.config()

app.get('/',function(req,res){
    return res.send("Api is running")
})
app.get('/api/products',function(req,res){
    return res.json(products)
})

app.get('/api/product/:id',function(req,res){
    const product=products.find(p=>p._id===req.params.id)

    return res.json(product)
})


const port=process.env.PORT||5000
app.listen(port,function(err){
    if(err){console.log("Error in running server")}
    console.log(`Server is running at port : ${port}`)
})