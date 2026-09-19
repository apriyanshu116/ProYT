import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

 const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            index:true,
            lowercase:true,
            trim:true,
            unique: true
        },
        email:{
             type:String,
            required:true,
            lowercase:true,
            trim:true,
            unique: true

        },
        fullName:{
            typr:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            tyrpe:String,
            required:true
        },
        coverImage:{
            type:String
        },
        watchHistory:{
            tyrpe:Schema.Types.ObjectId,
            ref:"Video"  
        },
        password:{
            type:String,
            required:[true,"password is required"]

        },
        refreshToken:{
            type:String
        }


    },{timeseries:true}
)
// hashing the password
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
})

// chacking again password
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.cpmapre(password,this.password)
}

//access token and refresh token generation
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            emails: this.emails,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

userSchema.methods.generateRefreshToken = function()
    {
      return jwt.sign(
        {
            _id: this._id,
           
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )  
    }


export const User = mongoose.model("User",userSchema)