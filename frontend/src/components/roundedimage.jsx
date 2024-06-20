export const Roundedimage=({imageurl,handleclick})=>{
    return <img className="relative p-0.5 bg-gradient-to-br from-black to-violet-700 rounded-full w-12 h-12 hover:cursor-pointer" src={imageurl} alt="image description" onClick={handleclick}/>
}