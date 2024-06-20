import { useEffect, useState } from "react"
import { Heading } from "../components/heading"
import { Makepost } from "../components/makepost"
import { Post } from "../components/post"
import { Profilebox } from "../components/profileBox"
import { Roundedimagebig } from "../components/roundedbig"
import { Friendsbox } from "../components/friendsbox"
import axios from "axios"
import { Profilecard } from "../components/profilecard"
import { useSearchParams } from "react-router-dom"
import { Friendprofilecard } from "../components/friendprofilecard"
export const Frienddashboard=()=>{
    const [my_posts,setmy_posts]=useState([{}])
    const [searchparams]=useSearchParams()
    const name=searchparams.get("friend_user_id")
    useEffect(()=>{
        const fn=async function(){
            const resp=await axios.post("http://localhost:3000/friend_posts",{
                friend_user_id:name
            },{
                
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                  }

            )
            setmy_posts(resp.data.posts)
            
        }
        fn()        
    },[])
    return(
        <div className="flex flex-row">
            <div className="basis-1/3 ">
               <div className="flex fixed top-2 left-2 items-center">
                <Profilebox label={"Nitin Goyal"}></Profilebox>
               </div>
            </div>

            <div className="basis-1/3 items-center justify-center">

            <Friendprofilecard/>
            
            {my_posts.map((post)=>{
                return <Post photo={post.photourl} name={post.name} profilepic={post.profilepic} caption={post.caption} likebyme={post.likebyme} likes={post.likes} post_id={post.post_id} posttime={post.timestamp}/>
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