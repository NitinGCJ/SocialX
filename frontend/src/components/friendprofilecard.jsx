import { useEffect, useState } from "react"
import { Heading } from "./heading"
import { Smallheading } from "./smallheading"
import { Custombutton } from "./custombutton"
import { Roundedimage } from "./roundedimage"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Roundedmedium } from "./roundedmedium"
import { useSearchParams } from "react-router-dom"
export const Friendprofilecard=()=>{
    const [username,setusername]=useState("")
    const [profilepic,setprofilepic]=useState("")
    const [bio,setbio]=useState("")
    const [searchparams]=useSearchParams()
    const name=searchparams.get("friend_user_id")
    const [total_posts,settotal_posts]=useState(0)
    const [total_friends,settotal_friends]=useState(0)

    const navigate=useNavigate()
    useEffect(()=>{
        const fn=async function(){
            const resp=await axios.post("http://localhost:3000/friend_info",{
                friend_user_id:name
            },{
                
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                  }

            )
            setprofilepic(resp.data.profilepic)
            setusername(resp.data.username)
            settotal_posts(resp.data.totalposts)
            settotal_friends(resp.data.totalfriends)
            setbio(resp.data.bio)
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
            <div className=" w-48 font-custom italic text-xl pt-2 shadow-lg ">Posts: {total_posts}</div>
            <div className=" w-48 font-custom italic text-xl pt-2 shadow-lg ">Friends: {total_friends}</div>
            </div>
            <Custombutton label={"Unfriend"} onClick={async ()=>{
                  const resp=axios.post("http://localhost:3000/remove_friend",{
                    user2_id:name
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