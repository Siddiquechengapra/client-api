const express=require("express")
const router=express.Router()
const{insertticket} = require("./Model/Ticketmodel")

router.all("/",(req,res,next)=>{
    
    // res.json({message:"return from ticket router "})  
    next()
})

router.post("/",async(req,res)=>{
    const{subject,sender,message}=req.body
    const ticketObj={
        clientId:"601f92a5c257c7116d14a350",
        subject,
        conversation:[
            {
                sender,
                message
            }
        ]

    }
    const result =await insertticket(ticketObj)
    console.log("resullll",result)
    if(result && result._id){
        return res.json({status:"success",message:"ticket has been created "})
     
    }else{
        return res.json({status:"failed",message:"unable to create the ticket"})
    }

    
})

module.exports=router