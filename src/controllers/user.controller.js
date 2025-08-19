import { asynchandeler } from "../utils/async_handler.js";
import { User } from "../models/user.model.js";
import {apiError} from "../utils/api_error.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {Api_response} from "../utils/api_response.js"

const registerUser = asynchandeler (async (req,res)=>{
    res.status(200).json({
            message:"This API is for register user"
        }
    )
})

const userLogin = asynchandeler(async (req,res)=>{
    //Algorithm
    /*
    1. Get user details from front end.
    2. Validation - if required files are empty or not
    3. Check if the user is already exist or not - {username, or email}
    4. Check for Image, Check for Avatar
    5. Upload then to cloudinary , Avatar
    6. create user object, this will reflect in our database
    7. remove password and refreshtoken field
    8. check for user creation
    9. Return resposne
   */

    const {fullName,userName,email,password}=req.body
    // console.log("email",email)
    // console.log("Username",userName)
    // console.log("Password",password)
    // console.log("FullName",fullName)

    //Validation
    if([fullName,email,password,userName].some((field)=>field?.trim() === "")){
        throw apiError(400,"All fileds are required")
    }
    //checking if the user already exist or not
    const existedUser = User.findOne({
        $or:[{userName},{email}]
    })
    if(existedUser){
        throw new apiError(409,"User with this username or email is alreary exist..")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new apiError(400,"Avatar file is required");
    }
    //upload to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    // againg checking the avatar file is uploded or not

    if(!avatar){
        throw new apiError(400,"Avatar file is required..")
    }
    //Entry is database
    const user = await User.create({
        fullName,
        email,
        password,
        userName:userName.toLowercase,
        avatar:avatar.url,
        coverImage:coverImage?.url || ""
    })
    //removing password and refresh token
    const createdUser = await user.findByid(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new apiError(500,"Sonething went wrong while craeting the User")
    }
    return res.seatus(201).json(
        new Api_response(200,createdUser,"New user registration successfull..")
    )
})


export  {registerUser,userLogin}
