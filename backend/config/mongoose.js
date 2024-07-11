import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const url=process.env.MongoURL
 mongoose.connect(url)

 const db=mongoose.connection  

 db.on('error',console.error.bind(console,"Error on connecting to DB"))
 
 db.once('open',function(){
    console.log("Connected to DB")
 })

 export default db