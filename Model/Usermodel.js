const {User} =require("./Userschema")

exports.insertUser=(userObj) =>{

    return new Promise((resolve,reject)=>{
        User(userObj).save((err,data)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
   
    
}

 