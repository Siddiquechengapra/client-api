const {verifyAccessJWT}= require("../Helpers/jwthelper")

const {getJWT}= require("../Helpers/redishelper")

exports. userAuth=async(req,res,next)=>{
    const {authorization}=req.headers
    const decoded=await verifyAccessJWT(authorization.split(" ")[1]) 
    console.log(decoded)
    if(decoded.email){
        
        const userID=await getJWT(authorization.split(" ")[1])
         console.log("userid",userID)

         if(!userID){
            return  res.status(403).json({message : "forbidden"})
         }else{
            req.userId=userID
            next()
         }
         
    }
   
 

    next()
}