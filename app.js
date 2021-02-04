const express= require("express")
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


//routers
const userRouter=require("./userrouter")
const ticketRouter=require("./ticketrouter")
const handleerror=require("./errorhandler")

app.use("/v1/user",userRouter)
app.use("/v1/ticket",ticketRouter)



const port=process.env.PORT || 3001



app.use("*",( req,res,next) =>{

    const error= new Error("resource not found")
    error.status=404
    next(error)
})
app.use((error,req,res,next)=>{
    handleerror(error,res)
})

app.listen(port,()=>{
    console.log(`Api is ready on http://localhost:${port}`)
})