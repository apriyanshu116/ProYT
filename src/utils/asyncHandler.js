const asyncHandler = (requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((error)=>next(error))
    }
}
export {asyncHandler}


//we use also try and catch in above highorder function 
/*
const asyncHandler = (fn)=>async(req,res,nest)=>{
    try{
    await fn(req,res,next)
    }
    catch(error){
    re,status(error.code || 500).json({
    success:false,
    message: error.message
    })
    }

}*/