import { useEffect, useState } from "react"
import { Friendiconname } from "./friendiconname"
import { Heading } from "./heading"
import { Textbox } from "./textbox"
import axios from "axios"

export const Friendsbox=()=>{
    const [friends,setfriends]=useState([{}])
    useEffect(()=>{
        const fetchfriends=async function(){
               const token=localStorage.getItem("token")
               const response=await axios.get("http://127.0.0.1:3000/get_friends",{
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
              })
               
               setfriends(response.data.friends)
               
        }
        fetchfriends()
        console.log(friends)
    },[])
    
    return (
        
        <div className="w-80 relative p-1 bg-gradient-to-br from-black to-violet-700 rounded-lg">
        <div className="text-center bg-white rounded-lg p-6">
             <Textbox label={"Your Friends"}></Textbox>
             
             {
                friends.map((friend)=>{
                    return <Friendiconname name={friend.username} imageurl={friend.profilepic} id={friend._id}/>
                })
             }
            
           
            </div>
            </div>
    )
}

