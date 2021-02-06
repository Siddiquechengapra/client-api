const express=require("express")
const router=express.Router()
const {insertUser} =require("./Model/Usermodel")
const {hashpassword} =require("./Helpers/bcrypthelper")

router.all("/",(req,res,next)=>{
    // res.json({message:"return from user router "})
    next()
})

router.post("/",async(req,res)=>{

    const {name,company,address,phone,email,password}=req.body


    try{

        //haspassword
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

module.exports=router