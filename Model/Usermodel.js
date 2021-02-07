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
 