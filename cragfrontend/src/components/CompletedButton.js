import { ToggleButton,ToggleButtonGroup,Box} from "@mui/material"
import FlashIcon from '@mui/icons-material/Bolt'
import EyeIcon from '@mui/icons-material/RemoveRedEye'
import BoyIcon from '@mui/icons-material/Boy'
import { useState} from "react"
import usersServices from "../services/users"
import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"

const CompletedButton = (props)=>{
  const dispatch = useDispatch()
  const [value, setvalue] = useState(null)
  
  const handleCompleted = async (e,newValue)=>{
    if(props.completed){
      setvalue(newValue)
      const updatedCompleted = props.user.completed.filter(v=> v.name !== props.via.name)
      const updatedUser = {...props.user,completed: updatedCompleted}
      await usersServices.updateFavs(updatedUser)
      dispatch(setUser(updatedUser))
      window.localStorage.setItem('loggedUser',JSON.stringify(updatedUser))
      
    }
    else{
      setvalue(newValue)
      const updatedCompleted = props.user.completed.concat({...props.via,how:newValue})
      const updatedWIP = props.wip.filter(v=> v.name !== props.via.name)
      const updatedUser = {...props.user,completed: updatedCompleted,workInProg:updatedWIP}
      await usersServices.updateFavs(updatedUser)
      dispatch(setUser(updatedUser))
      window.localStorage.setItem('loggedUser',JSON.stringify(updatedUser))

    }
    
  }
  return(
    <Box>
      <ToggleButtonGroup
        exclusive
        value={props.completed}
        onChange={handleCompleted}
      >
        <ToggleButton value={'flash'} >
          <FlashIcon></FlashIcon>
        </ToggleButton>
        <ToggleButton value={'OnSight'}>
          <EyeIcon/>
        </ToggleButton>
        <ToggleButton value={'Normal'}>
          <BoyIcon/>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}

export default CompletedButton