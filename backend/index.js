const express=require("express")
const mongoose=require("mongoose")

const {signup}=require ("./database")


const app=express()

app.use(express.json())

app.listen(3000,()=>{
    console.log("3000 port listening ")
})

app.post("/signup",async (req,res)=>{
      const username=req.body.username;
      const password=req.body.password;
    
      
      const resp=await signup(username,password)
      if(resp==true){
        res.send( "Successfully created User!!")
      }
      
      else {
        res.send( "Username already exist :(")
      }
     

})