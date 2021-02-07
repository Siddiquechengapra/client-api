const jwt=require("jsonwebtoken")

exports. createJwt=(payload)=>{
    jwt.sign({payload},{expiresIn:"1h"},process.env.JWT_ACCESS_SECRET,function(err,token){
        if(err){
            console.log(err)
        }
        else{
            return token
        }
    })
   
    

}
exports.refreshJwt=(payload)=>{
    const refreshjwt=jwt.sign({payload},{expiresIn:"30d"},process.env.JWT_REFRESH_SECRET,function(err,token){
        if(err){
            console.log(err)
        }
        else{
            return token
        }
    })



}
 