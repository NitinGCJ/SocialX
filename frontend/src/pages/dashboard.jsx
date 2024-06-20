import { useEffect, useState } from "react"
import { Heading } from "../components/heading"
import { Makepost } from "../components/makepost"
import { Post } from "../components/post"
import { Profilebox } from "../components/profileBox"
import { Roundedimagebig } from "../components/roundedbig"
import { Friendsbox } from "../components/friendsbox"
import axios from "axios"

export const Dashboard=()=>{
    const [feed,setfeed]=useState([{}])
    useEffect(()=>{
        const fn=async function(){
            const resp=await axios.get("http://localhost:3000/get_feed",{
                
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                  }

            )
            setfeed(resp.data.feed)
        }
        
            fn()
        
        
        
        
    },[])
    return(
        <div className="flex flex-row">
            <div className="basis-1/3 ">
               <div className="flex fixed top-2 left-2 items-center">
                <Profilebox></Profilebox>
               </div>
            </div>

            <div className="basis-1/3">
            <Makepost feed={feed} setfeed={setfeed}/>
            {feed.map((post)=>{
                return <Post photo={post.photourl} name={post.name} profilepic={post.profilepic} caption={post.caption} likebyme={post.likebyme} likes={post.likes} post_id={post.post_id} setfeed={setfeed} posttime={post.timestamp}/>
            })}
            
            </div>
            <div className="basis-1/3">

            <div className="flex fixed top-2 right-20">
            <Friendsbox/>
               </div>
                
            </div>
         </div>

    )
}