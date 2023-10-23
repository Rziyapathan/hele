const express=require('express')
const {auth}=require('../middlewares/authmiddleware')
const {BookModel}=require('../model/bookModel')
const bookRouter=express.Router()


bookRouter.post('/add',auth,async(req,res)=>{
    const {title,genre,author,publishing_year}=req.body

    try{
        const book=new BookModel({title,genre,author,publishing_year})
        await book.save()
        res.status(200).send({"msg":"Book added", "addedBook": book })
    }
    catch(err){
        res.status(400).send({"error":err})
    }

})

bookRouter.get('/',auth,async(req,res)=>{
    try{
        const books=await BookModel.find()
        res.status(200).send(books)
    }
    catch(err){
        res.status(400).send({"error":err})
    }
})

bookRouter.patch('/update/:id',auth,async(req,res)=>{
    const {id}=req.params
    try{
        await BookModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":"Book has been updated"})
    }
    catch(err){
        res.status(400).send({"error":err})
    }

})

bookRouter.delete('/delete/:id',auth,async(req,res)=>{
    const {id}=req.params
    try{
        await BookModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"Book has been deleted"})
    }
    catch(err){
        res.status(400).send({"error":err})
    }

})


module.exports={bookRouter}