import { useEffect, useState } from "react"
import { Heading } from "./heading"
import { Smallheading } from "./smallheading"
import { Custombutton } from "./custombutton"
import { Roundedimage } from "./roundedimage"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Roundedmedium } from "./roundedmedium"
import { useSearchParams } from "react-router-dom"
import { Userimage } from "./userimage"
export const Usercard=({username,profilepic,id})=>{
    
   
    const navigate=useNavigate()
    
    return (
      <div className="pt-1 pb-1">
        <div className="w-104 p-1 bg-gradient-to-br from-black to-violet-700 rounded-lg">
         <div className="bg-white rounded-lg p-2">
          <div className="flex justify-between text-center items-center space-x-4">
            
            
            <Userimage imageurl={profilepic}/>
            <div className="font-custom text-xl">{username}</div>
            
            <Custombutton label={"Add Friend"} onClick={async ()=>{
                  const resp=axios.post("http://localhost:3000/make_friend",{
                    user2_id:id
                  },{
                
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                  })
                  navigate("/dashboard")
            }}/>

            
            </div>
            </div>

         </div>
         </div>
         
    )
}