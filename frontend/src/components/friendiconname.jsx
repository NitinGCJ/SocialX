import { useNavigate } from "react-router-dom"
import { Roundedimage } from "./roundedimage"


export const Friendiconname=({name,imageurl,id})=>{
    const navigate=useNavigate()
    return(
        <div className="flex justify-between items-center p-1.5">
            <Roundedimage imageurl={imageurl} handleclick={()=>{
                navigate(`/frienddashboard?friend_user_id=${id}`)
                window.location.reload(true);
            }}/>
            <div className="font-semibold">{name}</div>
            <div></div>

        </div>
    )
}