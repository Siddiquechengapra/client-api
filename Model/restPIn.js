const {ResetModel} =require("./resetPinSchema")
const {randomPinnumber} =require("./Randomgenerator")

exports.setPasswordRestPin=(email) =>{
    return new Promise((resolve,reject)=>{
    //random 6 digit creation
    let randpin=randomPinnumber(6)
    console.log("randpin",randpin)
    let restObj={email,pin:randpin}

   
        ResetModel(restObj).save((err,data)=>{
            if(err){
                console.log("error here resetmodel",err)
                reject(err)
            }else{
                console.log("data fromsetpasswordrespin",data)
                resolve(data)
            }
        })
    })
   

}
//promise tutorial
exports.getPinbyEmailPin=(email,pin)=>{

    return new Promise((resolve,reject)=>{
        try{
            ResetModel.findOne({email,pin}).exec((error,data)=>{
                if(error){
                    resolve(error)
                }else{
                    resolve(data)
                }
            })
        }
        catch(error){
            reject(error)
            console.log(error )
        }

    })
    
}

exports.deletePin=(email,pin)=>{

    
        try{
            ResetModel.findOneAndDelete({email,pin}).exec((error,data)=>{
                if(error){
                   console.log("pin data deleted")
                }
            }) 
        }
        catch(error){
            
            console.log(error )
        }

    
    
}



       
        

    
    

 