const mongoose=require("mongoose")
const Schema=mongoose.Schema

const resetPinSchema = new Schema({
    pin:{
        type:String,
        maxlenght:6,
        minlength:6

    },
    
    email:{
        type:String,
        maxlenght:50,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:8,
        
    },
    refreshJWT:{
        token:{
            type:String,
            maxlength:600,
            default:""
        },
        addeedat:{
            type:Date,
            required:true,
            default:Date.now()
        }

    }
})
const ResetModel =mongoose.model('ResetModel',resetPinSchema)
module.exports={ResetModel}