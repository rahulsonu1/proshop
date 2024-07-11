import dotenv from 'dotenv'
import path from 'path'
dotenv.config()
import express from 'express'
const app=express()
import db from './config/mongoose.js'




import productRoutes from './routes/product.js'
import userRoutes from './routes/user.js'
import orderRoutes from './routes/order.js'
import uploadRoutes from './routes/upload.js'
import errorHandler from './config/errorMiddleware.js'



app.use(express.json())
app.use(express.urlencoded())
app.use('/api/products',productRoutes)
app.use('/api/user',userRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/upload',uploadRoutes)


const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

app.use(errorHandler.error)
app.use(errorHandler.errorStatus)
app.use(express.json())




const port= 7000
app.listen(port,function(err){
    if(err){console.log("Error in running server")}
    console.log(`Server is running at port : ${port}`)
})
