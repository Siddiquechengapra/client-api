const express=require("express")
const router=express.Router()
const {verifyrefreshJWT}=require("./Helpers/jwthelper")

router.get("/",async(req,res,next)=>{

    const {authorization}=req.headers
    
    const decoded =await verifyrefreshJWT(authorization.split(" ")[1])
    console.log("decoded :",decoded)
    res.json({message:authorization.split(" ")[1]})
    next()
})

module.exports=router 