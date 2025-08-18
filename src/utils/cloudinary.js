import {v2 as cloudinary} from "cloudinary"
import { error } from "console"
import fs from "fs"

cloudinary.config({
    cloudinary_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const uploadOnCloudinary = async (localfilepath)=>{
    try{
        //checking if the file path already exist or not
        if (!localfilepath) return "No local file path found"
        //if exist, file uploaded successfully
        const resposne = await cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})
        console.log("File uploaded successfully",resposne.url)
        return resposne
    }
    catch(error){
        fs.unlink(localfilepath)
        return null
    }
}
export {uploadOnCloudinary};