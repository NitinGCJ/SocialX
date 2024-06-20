import { useEffect, useState } from "react"
import { Heading } from "../components/heading"
import { Makepost } from "../components/makepost"
import { Post } from "../components/post"
import { Profilebox } from "../components/profileBox"
import { Roundedimagebig } from "../components/roundedbig"
import { Friendsbox } from "../components/friendsbox"
import axios from "axios"
import { Editprofilebox } from "../components/editprofilebox"

export const Editprofile=()=>{
    
    return(
        <div className="flex flex-row">
            <div className="basis-1/3 ">
               <div className="flex fixed top-2 left-2 items-center">
                <Profilebox label={"Nitin Goyal"}></Profilebox>
               </div>
            </div>

            <div className="basis-1/3">
               
               <Editprofilebox></Editprofilebox>
            
            </div>
            <div className="basis-1/3">

            <div className="flex fixed top-2 right-20">
            <Friendsbox/>
               </div>
                
            </div>
         </div>

    )
}