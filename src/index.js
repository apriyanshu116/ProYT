import mongoose from "mongoose"
import dotenv from "dotenv"
//write function in other or origin folder and export then into index file 
import connectDB from "./db/index.js"

dotenv.config({
    path:"./.env"
})

connectDB()
.then(()=>{
   app.listen(process.env.PORT || 8000, ()=>{
    console.log(` server is running at the port : ${process.env.PORT}`)
   })
})
.catch((error)=>{
     console.log("Mongo db connection failed !!! ",error);
})














//basic approach
/*

import express from "express"
const app = express();

;(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error",(error)=>{
            console.log("ERROR: ",error);
            throw error
        })
     
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening at port: ${process.env.PORT}`)
        })
    }
    catch(error){
        console.log(`ERROR : ${error}`)
    }
    throw error
} )()

*/