import { asynchandeler } from "../utils/async_handler.js";
const registerUser = asynchandeler (async (req,res)=>{
    res.status(200).json({
            message:"This API is for register user"
        }
    )
})
export default registerUser;