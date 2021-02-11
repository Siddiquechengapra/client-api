const{Ticket}=require("./Ticketschema")

exports. insertticket=ticketobj=>{

    return new Promise((resolve,reject)=>{

                Ticket(ticketobj).save((err,data)=>{
                    if(err){
                        console.log("error inside insertitcket",err)
                        reject(err)
                    }
                    else{
                        console.log(data)
                        resolve(data) 
                    }
                })

    })
}
    

exports. getalltickets=clientId=>{

    return new Promise((resolve,reject)=>{

                Ticket.find({clientId}).exec((err,data)=>{
                    if(err){
                        console.log("error inside getalltickets",err)
                        reject(err)
                    }
                    else{
                        console.log(data)
                        resolve(data) 
                    }
                })

    })
}

exports. getticketbyId=(_id,clientId)=>{

    return new Promise((resolve,reject)=>{

                Ticket.find({_id,clientId}).exec((err,data)=>{
                    if(err){
                        console.log("error inside getalltickets",err)
                        reject(err)
                    }
                    else{
                        console.log(data)
                        resolve(data) 
                    }
                })

    })
}




