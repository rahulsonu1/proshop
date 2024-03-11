import express from 'express'
import dotenv from 'dotenv'
const app=express()
import db from './config/mongoose.js'
dotenv.config()
import productRoutes from './routes/product.js'
import userRoutes from './routes/user.js'
import orderRoutes from './routes/order.js'
import errorHandler from './config/errorMiddleware.js'



app.use(express.json())
app.use(express.urlencoded())
app.use('/api/products',productRoutes)
app.use('/api/user',userRoutes)
app.use('/api/order',orderRoutes)
app.use(errorHandler.error)
app.use(errorHandler.errorStatus)
app.use(express.json())

const port=7000
app.listen(port,function(err){
    if(err){console.log("Error in running server")}
    console.log(`Server is running at port : ${port}`)
})