import app from "./src/app.js";
import connectdb from "./src/db/dbconnection.js";

connectdb()
.then(()=>{
    app.listen(process.env.PORT || 8080,()=>{
        console.log(`Server is running on port:${process.env.PORT || 8080}`)
    })
}).catch((error)=>{
    console.log("Server is not responding.. Due to: ", error)
})






/*
require("dotenv").config()
import mongoose  from "mongoose"
import { DB_NAME } from "./constants"

( async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    }catch(error){
        console.error("Database connection failed..Due to: ",error)
        throw error
    }
})
*/