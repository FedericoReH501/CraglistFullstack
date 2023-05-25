import { useState } from "react"
export const useTextInput = (type)=>{
  const [value, setValue] = useState('')
  const input ={
    name:type,
    id:type,
    label:type}
    const onChange =(e)=>{
      setValue(e.target.value)
    }
    return{...input,value,onChange}
                  
}