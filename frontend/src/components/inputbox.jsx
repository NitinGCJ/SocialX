export const Inputbox=({label,placeholder,onChange})=>{
    return <div className="pt-4 pb-1">
        <div className="text-sm font-medium pb-1">{label}</div>
        <input placeholder={placeholder} onChange={onChange}/> 
    </div>
}