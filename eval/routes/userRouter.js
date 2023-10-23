const express=require('express')
const bcrypt=require('bcrypt')
const userRouter=express.Router()
const jwt=require('jsonwebtoken')
const {UserModel}=require('../model/userModel')



userRouter.post('/register',async(req,res)=>{
     const {name,email,pass,city,age}=req.body
     console.log(req.body)
     // let text = "The best things in life are free";
     // let uppercase=/[A-Z]/
     // let result1 = uppercase.test(pass)
     // let number=/[0-9]/
     // let result2 = number.test(pass)
     // if(!(result1 && result2)){
     //      res.send({'err':'invalid password'})
     // }
     const user=await UserModel.findOne({email})
     if(user){
      res.status(400).send({"error":"user already exists"})
     }
     else{
      try{
          bcrypt.hash(pass,5, async function(err, hash) {
               if(err){
                    res.send({"err":err})
               }else{
                    const newUser=new UserModel({name,email,pass:hash,city,age})
                    await newUser.save()
                    res.status(200).send({"msg":"The new user has been registered", "registeredUser":newUser})
               }
           });
      }
      catch(err){
          res.status(400).send({"error":err})
     }
      
     }
     
})
userRouter.post('/login',async(req,res)=>{
    const {email,pass}=req.body
    const user=await UserModel.findOne({email})
    if(user){
     bcrypt.compare(pass,user.pass, function(err, result) {
          if(result){
               var token = jwt.sign({course: 'node' }, 'masai',{expiresIn:120});
               res.status(200).send({"msg":"Login successful!", "token":token, "refreshToken":token})
          }
          else{
               res.status(400).send({"error":"error logging in"})
          }
      });
    }
})
userRouter.get('/logout',(req,res)=>{
     
})


module.exports={userRouter}