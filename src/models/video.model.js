import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggreagte-paginate-v2"

const videoSchema = new Schema(
    {
        videoFile:{
            type:String, //cloudinary url
            required:true

        },
        thumbnail:{
             type:String, 
            required:true

        },
        title:{
             type:String, 
            required:true
        },
        discription:{
             type:String, //cloudinary url
            required:true
        },
        duration:{
             type:Number,
            required:true

        },
        views:{
            type:Number,
            required:true
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        ownner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }

    },{timestamps:true}
)


videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video",videoSchema)