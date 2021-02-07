const mongoose=require("mongoose")
const Schema=mongoose.Schema

const UserSchema = new Schema({
    name: {
        type:String,
        maxlenght:50,
        required:true
    },
    company:{
        type:String,
        maxlenght:50,
        required:true
    },
    address:{
        type:String,
        maxlenght:100,
        required:true
    },
    phone:{
        type:Number,
        maxlenght:11,
        
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
        required:true
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
const User =mongoose.model('User',UserSchema)
module.exports={User}