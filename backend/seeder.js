import mongoose from "mongoose";
import users from './data/user.js'
import products from "./data/products.js";
import User from './model/user.js'
import Product from './model/product.js'
import Order from './model/order.js'
import db from "./config/mongoose.js";



const importData=async()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers=await User.insertMany(users)
        const adminUser= createdUsers[0]._id

        const sampleProducts=products.map(product=>{
            return {...product,user:adminUser}
        })

        await Product.insertMany(sampleProducts)
        console.log('data imported')
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

const deleteData=async()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        
        console.log('data deleted')
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

if(process.argv[2]==='d'){
    deleteData()
}else{
    importData()
}