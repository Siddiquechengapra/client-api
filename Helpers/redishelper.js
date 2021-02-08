const redis=require("redis")
const client=redis.createClient(  )

client.on("error",function(error){
    console.log(error)
})

exports.setJWT=(key,value)=>{

    client.set(key,value,function(err,res){
            if(err){
                console.log("error is in setJWT ",err)
            }
            else{
                return res
            }
    })
}

exports.getJWT=(key,value)=>{

    return new Promise((resolve,reject)=>{
        client.get(key,function(err,res){
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
    })

    })

    
}

exports.deletJWT=key=>{
    try{
        client.del(key)
    }
    catch(error){
            console.log("error from redis token refreshing :",error)
    }
}