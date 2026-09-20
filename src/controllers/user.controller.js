import {asyncHandler} from "../utils/asyncHandler.js"
import  {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async(req,res)=>{
    // get user details from frontend
     const {fullName, email, username, password}= req.body
    console.log("email: ",email)


    // validation - bot empty
       
    // validate like this one by one 
    /*if(fullName===""){
        throw new ApiError(400,"fullname is required")
    }  */

     // validate all using paas an arr in if using some and a callback function
     if(
        [fullName,email,username,password].some((field)=>
        field?.trim()==="")
     ) {
        throw new ApiError(400,"all fields are required required")
     }  
   
    // check if user already exists : username,  mail
   const existedUser= User.findOne({
    $or: [{username},{email}]
   })
   if(existedUser){
    throw new ApiError(409,"user already exist with this mail or with username")
   }

    // check for image and also fro avatar

   const avatarLocalPath= req.files?.avatar[0]?.path;
   const coverImageLocalPath =req.files?.coverImage[0]?.path 
    // upload them to cloudinary, avatar
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if(!avatar){
        throw new ApiError(400,"Avatar files is require ")
    }

    // create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage:coverImage?.url || "",
        email,
        username:username.toLowerCase(),
        password
    })

    // check user is created or not  and remove password and refresh token field from the response 

  const createdUser= User.findById(user._id).select(
    "-password -refreshtoken"
  )

    // check for user creation 
    if(!createdUser){
        throw new ApiError(500,"something went wrong when usre create")
    }


    // return response
    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
    )


   
    
})

export {registerUser}