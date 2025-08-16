import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'

;const dbcon = ( async ()=>{
    try{
        const coninstance =await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(`Database connected!! \n Connection Host:${coninstance.Connection.host}`);
    }catch(error){
        console.error("Database connection failed. Due to ..",error)
        process.exit(1)
    }
    
})
export default dbcon;