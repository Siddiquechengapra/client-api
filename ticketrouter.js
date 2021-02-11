const express=require("express")
const router=express.Router()
const{userAuth}=require("./Middlewares/authorization")
const{insertticket,getalltickets,getticketbyId,updateclientreply,deleteticket,updatestatusclose} = require("./Model/Ticketmodel")

router.all("/",(req,res,next)=>{
    
    // res.json({message:"return from ticket router "})  
    next()
})

router.post("/",userAuth,async(req,res)=>{
    const{subject,sender,message}=req.body
    const ticketObj={
        clientId:req.userId,
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

//get all ticket s for a specific usr only
router.get("/",userAuth,async(req,res)=>{
    const clientId=req.userId
    const result =await getalltickets(clientId)
    console.log("result for get all tickets",result)
    if(result && result.length){
        return res.json({status:"success",result})
     
    }else{
        return res.json({status:"failed",message:"unable to fetch details"})
    }

    
})

router.get("/:ticketid",userAuth,async(req,res)=>{
    const _id=req.params.ticketid
    const clientId=req.userId
    const result =await getticketbyId(_id,clientId)
    console.log("result for get specific ticekt",result)
    if(result && result.length){
        return res.json({status:"success",result})
     
    }else{
        return res.json({status:"failed",message:"unable to fetch details"})
    }

    
})

router.put("/:ticketid",userAuth,async(req,res)=>{
    const _id=req.params.ticketid
    const{message,sender}=req.body
    const clientId=req.userId
    const result =await updateclientreply(_id,{message,sender})
    console.log("result for get specific ticekt",result)
    if(result._id){
        return res.json({status:"conversation updated ",result})
     
    }else{
        return res.json({status:"failed",message:"unable to update converation"})
    }

    
})

//close ticket with tcketid 
router.patch("/closeticket/:ticketid",userAuth,async(req,res)=>{
    const _id=req.params.ticketid
    const clientId=req.userId
    const result =await updatestatusclose(_id,clientId)
    console.log("result for closing ticket ",result)
    if(result._id){
        return res.json({status:"ticket closed ",result})
     
    }else{
        return res.json({status:"failed",message:"unable to close teh ticket"})
    }

    
})

router.delete("/:ticketid",userAuth,async(req,res)=>{
    const _id=req.params.ticketid
    const clientId=req.userId
    const result =await deleteticket(_id,clientId)
    console.log("result for closing ticket ",result)
    if(result._id){
        return res.json({status:"ticket closed ",result})
     
    }else{
        return res.json({status:"failed",message:"unable to close the ticket"})
    }

    
})

 
module.exports=router 