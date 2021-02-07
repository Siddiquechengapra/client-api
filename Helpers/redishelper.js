const redis=require("redis")
const client=redis.createClient(  )

client.on("error",function(error){
    console.log(error)
})

exports.setJWT=(key,value)=>{

    client.set(key,value,function(err,res){
            if(err){
                console.log("error is ",err)
            }
            else{
                return res
            }
    })
}

exports.getJWT=(key,value)=>{

    client.get('key',function(err,res){
            if(err){
                console.log(err)
            }
            else{
                return res
            }
    })
}