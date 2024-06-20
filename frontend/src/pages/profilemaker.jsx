import { useState } from "react"
import { Heading } from "../components/heading"
import { Inputbox } from "../components/inputbox"
import { Smallheading } from "../components/smallheading"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { Roundedimage } from "../components/roundedimage"
import { Roundedimagebig } from "../components/roundedbig"
import { Roundedmedium } from "../components/roundedmedium"
import { Custombutton } from "../components/custombutton"
import axios from "axios"
export const Profilemaker=()=>{
    const [bio,setbio]=useState("")
    const [profilepic,setprofilepic]=useState("")
    const [searchparams]=useSearchParams()
    const name=searchparams.get("username")
    const navigate=useNavigate()
    return (
        
        <div className="h-screen flex items-center justify-center">
        <div className="w-1.5/5"></div>
        <div className="w-2/5 relative p-1 bg-gradient-to-br from-black to-violet-700 rounded-lg">
         <div className="text-center bg-white rounded-lg p-6">
            <Heading label={`Welcome ${name}!`}/>
            <Heading label={"Let us set up your profile"}/>
            <Smallheading label={"Upload a profile photo"}/>
      <input type="file" className=" text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100" onChange={(e)=>{
            console.log(e.target.files[0])
            setprofilepic((e.target.files[0]))
        }}/>
            <div className="flex justify-center pt-3">
            {profilepic?<Roundedmedium imageurl={URL.createObjectURL(profilepic)}></Roundedmedium>:<div></div>}
            </div>
            <Smallheading label={"Enter Your Bio"}/>
           
      <textarea
        className="w-96 h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Write about you...."
        value={bio}
        onChange={(e)=>{
            setbio(e.target.value)
        }}
      />

      
            <Custombutton label={"Next"} onClick={async ()=>{
                 const formData=new FormData()
                 formData.append('file',profilepic)
                 const uploadres=await axios.post("http://localhost:3000/upload",formData,{ headers: {'Content-Type': 'multipart/form-data'}})
                 console.log(uploadres)
                 const resp=await axios.post("http://localhost:3000/update_info",{
                    bio:bio,
                    profilepic:"./src/uploads/"+uploadres.data.filename

                 },{
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                  })
                  navigate("/dashboard")
            }}/>
         </div>
         </div>
         <div className="w-1.5/5"></div>
         </div>
    )
}