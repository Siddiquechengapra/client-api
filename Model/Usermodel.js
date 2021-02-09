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


exports.getuserbyemail =email=>{

    return new Promise((resolve,reject)=>{
        if(!email){
            reject (false )
        }
        User.findOne({email},(err,data)=>{
            if(err){
                console.log("inside err")
                reject(err)

                
            }
            console.log("outside err")

           resolve (data)

        })

    })
}

exports.storeUserRefreshJWT=(_id,token)=>{
         return new Promise((resolve,reject)=>{
             try{
                    User.findOneAndUpdate({_id},{
                        $set:{"refreshJWT.token":token,
                        "refreshJWT.addedAt":Date.now()}
                    }).then((data)=>{
                        resolve(data)
                    }
                    ).catch((err)=>{
                        reject(err)
                    })
             }
             catch(error){
                    reject(error)
             }  
         })
     }      

     exports.getUserbyId =(_id)=>{

        return new Promise(async(resolve,reject)=>{
            if(!_id){
                reject (false )
            }
            await User.findById({_id},(err,data)=>{
                if(err){
                    reject(err) 
                 }
                 console.log("gettin data ")
               resolve(data)
    
            })
    
        })
    }
        
     exports.updatePassword=(email,newhashedpass)=>{
         return new Promise((resolve,reject)=>{
            try{
                User.findOneAndUpdate ({email},{
                    $set:{"password":newhashedpass}
                },{new:true}).exec((err,data)=>{
                    if(err){
                       return res.json({message : "error in findoneandupdate Updatepassword"})
                    }
                    else {
                        resolve(data)
                    }
                })
         }
         catch(error){
                reject(error)
         }  
     })
 }      

    

 