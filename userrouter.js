const express=require("express")
const router=express.Router()
const {insertUser,getuserbyemail} =require("./Model/Usermodel")
const {hashpassword,comparepassword} =require("./Helpers/bcrypthelper")
const {createJwt,refreshJwt}=require("./Helpers/jtwthelper")

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
        const accessjwt= await createJwt(user.email)
        const refreshjwt=await refreshJwt(user.email)

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

module.exports=router