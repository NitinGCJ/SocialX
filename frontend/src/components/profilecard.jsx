import { useEffect, useState } from "react"
import { Heading } from "./heading"
import { Smallheading } from "./smallheading"
import { Custombutton } from "./custombutton"
import { Roundedimage } from "./roundedimage"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Roundedmedium } from "./roundedmedium"
export const Profilecard=({total_posts})=>{
    const [username,setusername]=useState("")
    const [profilepic,setprofilepic]=useState("")
    const [bio,setbio]=useState("")
    const navigate=useNavigate()
    useEffect(()=>{
        const fn=async function(){
            const resp=await axios.get("http://localhost:3000/my_info",{
                
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                  }

            )
            setprofilepic(resp.data.info[0].profilepic)
            setusername(resp.data.info[0].username)
            setbio(resp.data.info[0].bio)
        }
        fn()
    },[])
    return (
        <div className="pb-10">
        <div className="p-1 bg-gradient-to-br from-black to-violet-700 rounded-lg">
         <div className="bg-white rounded-lg p-6">
          <div className="flex-row justify-center text-center items-center">
            
            
            <Roundedmedium imageurl={profilepic}/>
            <div className="font-custom italic text-3xl pt-2">{username}</div>
            <div className="font-custom italic text-xl pt-2 shadow-sm ">{bio}</div>
            <div className="flex justify-center pt-3">
            <div className=" w-48 text-xl pt-2 shadow-lg ">Total Posts: {total_posts}</div>
            
            </div>

            
            </div>
            </div>

         </div>
         </div>
    )
}