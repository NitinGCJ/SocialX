import { timecalculation } from "../timecalc"
import { Custombutton } from "./custombutton"
import { Likebutton } from "./likebutton"
import { Likeunlike } from "./likeunlike"
import { Roundedimage } from "./roundedimage"
import { Smallheading } from "./smallheading"

export const Post=({name,caption,photo,likes,profilepic,likebyme,post_id,setfeed,posttime})=>{
    return(
        <div className="pt-1 pb-1">
        <div className="relative p-1 bg-gradient-to-br from-black to-violet-700 rounded-lg">
         <div className="break-words bg-white rounded-lg p-1">
            <div className="flex items-center space-x-4 p-2">
            <Roundedimage imageurl={profilepic}/>
            <div className="font-semibold">{name} posted this</div>
            </div>
            
           {photo?<img src={"./src/uploads/"+photo} className="max-w-full max-h-full"></img>:<div></div>}
           <div className="p-3 shadow-sm">{caption}</div>
           <Likeunlike likebyme={likebyme} likes={likes} post_id={post_id} setfeed={setfeed}/>
           <div className=" p-1 text-right text-gray-500">{timecalculation(posttime)}</div>
           

         </div>
         </div>
         </div>
    )
}