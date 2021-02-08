const express=require("express")
const router=express.Router()
const {verifyrefreshJWT,createJWT}=require("./Helpers/jwthelper")
const {getuserbyemail} =require("./Model/Usermodel")

router.get("/",async(req,res,next)=>{

    const {authorization}=req.headers
    
    const decoded =await verifyrefreshJWT(authorization.split(" ")[1])
   if(decoded.email){
       const userProf=await getuserbyemail(decoded.email)
       if(userProf._id){
           let dbrefreshtoken=userProf.refreshJWT.token
    let tokenExp =userProf.refreshJWT.addeedat
    tokenExp=tokenExp.setDate(tokenExp.getDate() + process.env.JWT_REFRESH_SECRET_EXP_DAY)
    const today = new  Date()
    if(dbrefreshtoken!== authorization.split(" ")[1] &&   tokenExp < today){
    return res.json({message:"Forbidden token expired "})

    }else {

        const accessJWT=await createJWT(decoded.email,userProf._id.toString())
        //delete the old token from redis db




    return res.json({response: accessJWT})

    }   
           
       }

   }
   res.status(403).json({message:"Forbidden in token"})
    next()
})

module.exports=router     