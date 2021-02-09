const Joi=require("joi")
const email=Joi.string()

 

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
        return res.json({message : value.error.message})
    }else{
    next()

    }

}