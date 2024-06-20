import { useEffect, useState } from "react"
import { Heading } from "./heading"
import { Smallheading } from "./smallheading"
import { Custombutton } from "./custombutton"
import { Roundedimage } from "./roundedimage"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export const Makepost=({feed,setfeed})=>{
    const [post_caption,setpost_caption]=useState("")
    const [post_url,setpost_url]=useState("")
    const [profilepic,setprofilepic]=useState("")
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
        }
        fn()
    },[])
    return (
        <div className="pb-10">
        <div className="p-1 bg-gradient-to-br from-black to-violet-700 rounded-lg">
         <div className="bg-white rounded-lg p-6">
          <div className="flex space-x-4 items-center">
            <Roundedimage imageurl={profilepic}/>
         <div className="font-semibold italic text-xl">
            Make a Post</div>
            </div>
            <Smallheading label={"Write down caption"}/>
            <textarea
        className="w-96 h-16 overflow-auto p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Caption"
        value={post_caption}
        onChange={(e)=>{
            setpost_caption(e.target.value)
        }}
      />

      <Smallheading label={"Upload a Photo"}/>
    
      <input type="file" className=" text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100" onChange={(e)=>{
            console.log(e.target.files[0])
            setpost_url((e.target.files[0]))
        }}/>
            <div className="flex justify-center pt-3">
            {post_url?<img src={URL.createObjectURL(post_url)} className="max-w-full max-h-full"></img>:<div></div>}
            </div>

      <Custombutton label={"Post"} onClick={async ()=>{
              
              const formData=new FormData()
              formData.append('file',post_url)
              const uploadres=await axios.post("http://localhost:3000/upload",formData)

              const resp=await axios.post("http://localhost:3000/make_post",{
                photourl:uploadres.data.filename,
                caption:post_caption
              },{
                
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
              })
              console.log(resp)
              
              
              setpost_caption("")
              setpost_url("")
              window.location.reload(true);
      }}/>
    

         </div>
         </div>
         </div>
    )
}