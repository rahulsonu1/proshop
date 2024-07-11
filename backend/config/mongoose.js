import mongoose from "mongoose"
 mongoose.connect('mongodb://localhost/ProShop')

 const db=mongoose.connection  

 db.on('error',console.error.bind(console,"Error on connecting to DB"))
 
 db.once('open',function(){
    console.log("Connected to DB")
 })

 export default db