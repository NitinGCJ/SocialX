import { useEffect, useState } from "react"
import { Heading } from "../components/heading"
import { Inputbox } from "../components/inputbox"
import { Smallheading } from "../components/smallheading"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { Roundedimage } from "../components/roundedimage"
import { Roundedimagebig } from "../components/roundedbig"
import { Roundedmedium } from "../components/roundedmedium"
import { Custombutton } from "../components/custombutton"
import axios from "axios"
export const Editprofilebox=()=>{
    const [bio,setbio]=useState("")
    const [profilepic,setprofilepic]=useState("")
    const [searchparams]=useSearchParams()
    const [name,setname]=useState("")
    const [oldpassword,setoldpassword]=useState("")
    const [newpassword,setnewpassword]=useState("")
    const [passwordmatch,setpasswordmatch]=useState(true)
    const navigate=useNavigate()

    useEffect(()=>{
        const fn=async function(){
            const resp=await axios.get("http://localhost:3000/my_info",{
                
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                  }

            )
            
            setname(resp.data.info[0].username)
            setbio(resp.data.info[0].bio)
        }
        fn()
    },[])
    return (
        <div className="relative p-1 bg-gradient-to-br from-black to-violet-700 rounded-lg">
         <div className="text-center bg-white rounded-lg p-6">
            <Heading label={"Edit your Profile"}/>
            <Smallheading label={"Upload new profile photo"}/>
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
        className="w-96 h-32 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Write about you...."
        value={bio}
        onChange={(e)=>{
            setbio(e.target.value)
        }}
      />

        
          <Inputbox label={"Old Pasword"} placeholder={"Old password"} onChange={(e)=>{
            setoldpassword(e.target.value)
            if(e.target.value==newpassword){
                setpasswordmatch(true)
            }
            else{
                setpasswordmatch(false)
            }
          }}></Inputbox>
          <Inputbox label={"New Pasword"} placeholder={"New password"} onChange={(e)=>{
            setnewpassword(e.target.value)
            if(oldpassword==e.target.value){
                setpasswordmatch(true)
            }
            else{
                setpasswordmatch(false)
            }
          }}></Inputbox>
          {passwordmatch?<Custombutton label={"Next"} onClick={async ()=>{
                 const formData=new FormData()
                 formData.append('file',profilepic)
                 const uploadres=await axios.post("http://localhost:3000/upload",formData,{ headers: {'Content-Type': 'multipart/form-data'}})
                 console.log(uploadres)

                 var body={}
                 if(profilepic){
                    body.profilepic="./src/uploads/"+uploadres.data.filename
                 }
                 if(bio){
                    body.bio=bio
                 }
                 if(newpassword){
                    body.password=newpassword
                 }
                 const resp=await axios.post("http://localhost:3000/update_info",body,{
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                  })
                  navigate("/dashboard")
            }}/>:<div></div>}
            
         </div>
         </div>
    )
}