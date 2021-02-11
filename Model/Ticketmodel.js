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

exports. updateclientreply=(_id,{message,sender})=>{

    return new Promise((resolve,reject)=>{

                Ticket.findOneAndUpdate({_id},{
                    status:"Pending operatior response"
                    ,
                    $push:{
                        conversation:{message,sender}
                    }
                },{new:true}).exec((err,data)=>{
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

exports. updatestatusclose=(_id,clientId)=>{

    return new Promise((resolve,reject)=>{

                Ticket.findOneAndUpdate({_id,clientId},{
                    status:"closed"
                    
                },{new:true}).exec((err,data)=>{
                    if(err){
                        console.log("error inside closeticket",err)
                        reject(err)
                    }
                    else{
                        console.log(data)
                        resolve(data) 
                    }
                })

    })
}

exports. deleteticket=(_id,clientId)=>{

    return new Promise((resolve,reject)=>{

                Ticket.findOneAndDelete({_id,clientId}).exec((err,data)=>{
                    if(err){
                        console.log("error inside closeticket",err)
                        reject(err)
                    }
                    else{
                        console.log(data)
                        resolve(data) 
                    }
                })

    })
}





