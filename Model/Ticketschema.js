const mongoose=require("mongoose")
const Schema=mongoose.Schema

const TicketSchema = new Schema({
    clientId:{
        type:Schema.Types.ObjectId
    },
    
    subject:{
        type:String,
        maxlength:100,
        required:true,
        default:""
    },
    openAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    status:{
        type:String,
        required:true,
        maxlength:30,
        default:"pending operator response "
        
        
    },
    conversation:[
        {
            message:{
                type:String,
                maxlength:100,
                required:true,
                default:" default message"
            },
            sender:{
                type:String,
                maxlength:50,
                required:true,
                default:"  "

            },
            msgAt:{
                type:Date,
                required:true,
                default:Date.now()
            }
        }
    ]
})
const Ticket =mongoose.model('Ticket',TicketSchema)
module.exports={Ticket}