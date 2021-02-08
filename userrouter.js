const express=require("express")
const router=express.Router()
const {insertUser,getuserbyemail,getUserbyId} =require("./Model/Usermodel")
const {hashpassword,comparepassword} =require("./Helpers/bcrypthelper")
const {createJWT,refreshJWT}=require("./Helpers/jwthelper")
const {userAuth} =require("./Middlewares/authorization")

router.all("/",(req,res,next)=>{
    // res.json({message:"return from user router "})
    next()
})

router.get("/",userAuth,async(req,res)=>{

    try{
        const _id=req.userId
        console.log("_i",_id)
   
        const userProf=await getUserbyId(_id)
        console.log("userprod",userProf)
         
        res.json({user : userProf})
   }
   catch(error){ 
        console.log("error catched",error)
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



    

module.exports=router