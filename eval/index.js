const express=require('express')
const {connection}=require('./db')
const {userRouter}=require('./routes/userRouter')
const {bookRouter}=require('./routes/bookRouter')
const {limiter}=require('./middlewares/rateLimiter')

const app=express()
app.use(express.json())
app.use(limiter)
app.use(express.json())
app.use("/users",userRouter)
app.use("/books",bookRouter)




app.listen(8000,async()=>{
    try{
        await connection
        console.log('connected to DB')
        console.log('server is running in port 8000') 
    }
    catch(err){
        console.log(err)
    }
})