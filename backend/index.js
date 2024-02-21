import express from 'express'
import dotenv from 'dotenv'
const app=express()
import products from './data/products.js'
import db from './config/mongoose.js'
dotenv.config()
import productRoutes from './routes/product.js'
import errorHandler from './config/errorMiddleware.js'

app.use('/api/products',productRoutes)
app.use(errorHandler.error)
app.use(errorHandler.errorStatus)

const port=7000
app.listen(port,function(err){
    if(err){console.log("Error in running server")}
    console.log(`Server is running at port : ${port}`)
})