const Joi=require("joi")


 

exports.resetPassvalidation =(req,res,next)=>{
     
    const schema=Joi.object({email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })})

    const value=schema.validate(req.body)
    if(value.error){
        return res.json({message : value.error.message})
    }else{
    next()

    }

}

exports.updatePassvalidation =(req,res,next)=>{
     
    const schema=Joi.object({email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    pin:Joi.string().min(6).max(6),newpassword:Joi.string()}
    
    

    )

    const value=schema.validate(req.body)
    if(value.error){
        return res.json({status:"error in Joi",message : value.error.message})
    }else{
    next()

    }

}
exports.createnewticketvalidation=(req,res,next)=>{
    const schema=Joi.object(
        {subject:Joi.string().min(2).max(50).required(),
            sender:Joi.string().min(2).max(50).required(),
            message:Joi.string().min(2).max(50).required()}
    )
    console.log("going to schema")
    const value= schema.validate(req.body)
    console.log("going from schema")
    console.log("value is :",value)
    //the output of validate is an object with 2 values,1.values 2.error
    if(value.error){
        return res.json({status:"error in Joi",message : value.error.message})
    }else{
    next()

    }
    
 }

 exports.replymsgvalidation=(req,res,next)=>{
    const schema=Joi.object(
        {
            sender:Joi.string().min(2).max(50).required(),
            message:Joi.string().min(2).max(50).required()}
    )

    const value= schema.validate(req.body)
    
    //the output of validate is an object with 2 values,1.values 2.error
    if(value.error){
        return res.json({status:"error in Joi replymsgvalidation",message : value.error.message})
    }else{
    next()

    }
    
 }
