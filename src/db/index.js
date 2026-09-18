import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Mongoose connected !! Db HOST: ${connectionInstance.connection.host}`);

    }
    catch(error){
        console.log("MONGOOSE DATABASE CONNECTION ERROR OR Faild", error);
        process.exit(1)
    }
}
export default connectDB;