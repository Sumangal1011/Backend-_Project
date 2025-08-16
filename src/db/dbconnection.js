import dotenv from  "dotenv"
dotenv.config({
    path: './env'
})
import mongoose from "mongoose";

const connectdb = ( async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(`\n Database connection successfull !! \n DB_HOST: ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("the URL",process.env.MONGODB_URI)
        console.error("Connection failed due to: ",error);
        process.exit(1)
    }
})
export default connectdb;