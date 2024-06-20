import { useEffect, useState } from "react"
import { Heading } from "../components/heading"
import { Makepost } from "../components/makepost"
import { Post } from "../components/post"
import { Profilebox } from "../components/profileBox"
import { Roundedimagebig } from "../components/roundedbig"
import { Friendsbox } from "../components/friendsbox"
import axios from "axios"
import { Usercard } from "../components/usercard"
import { Textbox } from "../components/textbox"

export const Makefriend=()=>{
    const [users,setusers]=useState([{}])
    useEffect(()=>{
        const fn=async function(){
            const resp=await axios.get("http://localhost:3000/all_users",{
                
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                  }

            )
            setusers(resp.data.users)
        }
        
            fn()
        
        
        
        
    },[])
    return(
        <div className="flex flex-row">
            <div className="basis-1/3">
               <div className="flex fixed top-2 left-2 items-center">
               <Profilebox></Profilebox>
               </div>
            </div>

            <div className="basis-1/3 pt-4">
            <Textbox label={"Make new friends!"}/>
            <div className="p-2"></div>
            
            {
                users.map((user)=>{
                     return <Usercard username={user.username} profilepic={user.profilepic} id={user._id}></Usercard>
                })
            }
            
            </div>
            <div className="basis-1/3">

            <div className="flex fixed top-2 right-20">
            <Friendsbox/>
               </div>
                
            </div>
         </div>

    )
}