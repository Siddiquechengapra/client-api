const express= require("express")
require("dotenv").config()
const app=express()
const bodyparser=require("body-parser")
const cors=require("cors")
const helmet=require("helmet")
const morgan=require("morgan")



app.use(helmet())
app.use(cors())
app.use(morgan())
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

const mongoose=require("mongoose")
 mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})

if(process.env.NODE_ENV !=="production"){
    const mDb=mongoose.connection
    mDb.on("open",()=>{
        console.log("MongoDB is connected ")
    
    })
    mDb.on("error",(error)=>{
        console.log("MongoDB is having error ",error)
    
    })

}


//routers
const userRouter=require("./userrouter")
const ticketRouter=require("./ticketrouter")
const tokensRouter=require("./tokensRouter")

const handleerror=require("./errorhandler")

app.use("/v1/user",userRouter)
app.use("/v1/ticket",ticketRouter)
app.use("/v1/tokens",tokensRouter)




const port=process.env.PORT || 3001



app.use("*",( req,res,next) =>{
    console.log("inside this *")
    const error= new Error("resource not found")
    error.status=404
    next(error)
})
app.use((error,req,res,next)=>{
    console.log("inside this * 2")

    handleerror(error,res)
})

app.listen(port,()=>{
    console.log(`Api is ready on http://localhost:${port}`)
})