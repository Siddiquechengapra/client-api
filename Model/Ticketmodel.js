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
    
