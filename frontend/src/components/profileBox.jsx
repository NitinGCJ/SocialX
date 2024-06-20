import { useState } from "react"
import { Custombutton } from "./custombutton"
import { Heading } from "./heading"
import { Roundedimagebig } from "./roundedbig"
import { SocialX } from "./socialx"
import  axios  from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const Profilebox=({label})=>{
    const [profilepic,setprofilepic]=useState(" ")
    const [name,setname]=useState("")
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
            setname(resp.data.info[0].username)
        }
        fn()
    },[])
    return (
        <div className="flex-row justify-center ">
            <SocialX handleclick={()=>{
                navigate("/dashboard")
            }}></SocialX>
            
            <div className="pt-10 text-center items-center">
            <Roundedimagebig imageurl={profilepic}></Roundedimagebig>
            <div className=" pt-2 pr-10 pb-10 text-3xl">
                           {name}
            </div>
            </div>
            <Custombutton label={"Discover People"} onClick={()=>{
                navigate("/make_friends")
            }}/>
            <Custombutton label={"My Posts"} onClick={()=>{
                navigate("/my_posts")
            }}/>
            <Custombutton label={"Edit Profile"} onClick={()=>{
                navigate("/edit_profile")
            }}/>
            <Custombutton label={"Log Out"} onClick={()=>{
                localStorage.removeItem("token")
                navigate("/signup")
            }}/>
            

        </div>
    )
}