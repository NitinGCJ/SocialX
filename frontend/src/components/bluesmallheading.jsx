import { Link } from "react-router-dom"
export const Bluesmallhaeding=({label,to})=>{
    return (
        
        <Link className="text-xs hover:text-blue-500" to={to}>
          {label}
        </Link>

    )
}