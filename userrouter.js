const express=require("express")
const router=express.Router()
const {insertUser,getuserbyemail,getUserbyId,updatePassword} =require("./Model/Usermodel")
const {hashpassword,comparepassword} =require("./Helpers/bcrypthelper")
const {createJWT,refreshJWT}=require("./Helpers/jwthelper")
const {userAuth} =require("./Middlewares/authorization")
const {setPasswordRestPin,getPinbyEmailPin,deletePin}=require("./Model/restPIn")
const {emailProcessor}=require("./Helpers/emailhelper")
const {resetPassvalidation,updatePassvalidation}=require("./Middlewares/formvalidatorjoi")


// router.all("/",(req,res,next)=>{
//     // res.json({message:"return from user router "})
//     next()
// })


//get userprofile router
router.get("/",userAuth,async(req,res)=>{

    try{
        const _id=req.userId
        console.log("_id :",_id)
   
        const userProf=await getUserbyId(_id)
        console.log("userprod :",userProf)
         
        res.json({user : userProf})
   }
   catch(error){ 
        console.log("error catched :",error)
   }
   })
//create new user(/v1/user/)
router.post("/",async(req,res)=>{

    const {name,company,address,phone,email,password}=req.body


    try{   //haspassword
    const hashedpass=await hashpassword(password)
    const newUserObj={
        name,company,address,phone,email,
        password:hashedpass
         
    }
    const result=await insertUser(newUserObj)
    console.log(result)
    res.json({message :"New user created " ,result})

    }
    catch(error){
    res.json({message :error.message})


    }
    
})
//create new user(/v1/user/login)

//user signin router 
router.post("/login",async (req,res)=>{


        const {email,password}=req.body

    if(!email || !password){
        return res.json("invalid form submission")
    }

    const user =await getuserbyemail(email)
    
    
    const passfromdb=user && user._id ?user.password:null
    if(user){  
    const result=await comparepassword(password,passfromdb)
    
    if(result){
        const accessjwt= await createJWT(user.email,`${user._id}`)
        const refreshjwt=await refreshJWT(user.email,`${user._id}`)

        res.json({status:"success",message:"login successfully",accessjwt,refreshjwt})
    }
    else{
        return res.send("Mo result,password is wrong")
    }

    }
    if(!user){
        return res.json({status:"error",message:"invalid email or password"})
    }
    
 
    

    
})
//generate pin and mail
router.post("/reset-password",resetPassvalidation,async(req,res)=>{

    const {email}=req.body
    const user= await getuserbyemail(email)
    console.log("new user:",user)
    if(user && user._id){
    const setPin= await setPasswordRestPin(email)
    console.log("set pin : ",setPin)
    const result=await emailProcessor({email:email,pin:setPin.pin,type:"request-new-password"})
     console.log("result : ",result)
    if(result && result.messageId){
    return res.json({
              status:"successs",
             message:"if the mail is exist in oput databse, the password reset pin will be sent shortly"})
     }else{
        return res.json({status:"error",
          message:"unable tosend ,please try later "})
    }
         
       



        
    }
    return res.json({setPin})


})

//update password 
router.patch("/reset-password",updatePassvalidation,async(req,res)=>{
    const {email,pin,newpassword}=req.body

   const getPin=await getPinbyEmailPin(email,pin)

   if(getPin && getPin._id){
       const dbDate= getPin.addedat
       const expiresIn=1

       const expDate=Date(dbDate.setDate(dbDate.getDate()+expiresIn) )
       const today=new Date()
       console.log("today:",today)
       console.log("exp:",expDate)

       if (today < expDate){
           return res.json({message :"invalid or pin expired"})
       }
       //encrypt new password 
       const hashedpass=await hashpassword(newpassword)
       console.log("hashed pass",hashedpass)
       const result =await updatePassword(email,hashedpass)
       console.log("result is :",result)
       if(result._id){

        //send mail user notification on updation
        await emailProcessor({email:email,type:"update-password-success"})
        deletePin(email,pin)

         return   res.json({message:"pwd has been updated "})
       }
   }else{
       return res.json({message :" No user found or is deleted"})
   }

    

})
    

module.exports=router