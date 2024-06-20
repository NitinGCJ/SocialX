import { Heading } from "../components/heading"
import { Smallheading } from "../components/smallheading"
import { Inputbox } from "../components/inputbox"
import { Custombutton } from "../components/custombutton"
import React, { useState } from  'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bluesmallhaeding } from "../components/bluesmallheading";

export const Signin=()=>{
     const [username,setusername]=useState("")
     const [password,setpassword]=useState("")
     const [valid,setvalid]=useState("")
     const navigate=useNavigate()

    return<div className="h-screen flex items-center justify-center">
            <div className="relative p-1 bg-gradient-to-br from-black to-violet-700 rounded-lg">

         <div className="text-center bg-white rounded-lg p-6">
        <Heading label={"Welcome to SocialX!"}/>
        <Heading label={"Signin"}/>
        <Smallheading label={"Enter your credentials"}/>
        <Inputbox label={"Username"} placeholder={"Username"} onChange={(e)=>{
             setusername(e.target.value)
        }}/>
        <Inputbox label={"Password"} placeholder={"Password"} onChange={(e)=>{
             setpassword(e.target.value)
        }}/>
        <Smallheading label={valid}></Smallheading>
        <Custombutton label={"Sign In!"} onClick={async ()=>{

             const response=await axios.post("http://localhost:3000/signin",{
                username:username,
                password:password
             })
             if(response.data.message==true){
                 localStorage.setItem("token",response.data.token)
                  navigate(`/dashboard?username=${username}`)
             }
             else{
                   setvalid("Invalid Credentials :(")
             }

        }}/>
        <Bluesmallhaeding label={"Do not have an account ?"} to={"/signup"}> </Bluesmallhaeding>
        
     
    
     </div>
        </div>


    </div>

}