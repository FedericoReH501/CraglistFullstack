import { ToggleButton,ToggleButtonGroup,Box } from "@mui/material"
import FlashIcon from '@mui/icons-material/Bolt'
import EyeIcon from '@mui/icons-material/RemoveRedEye'
import BoyIcon from '@mui/icons-material/Boy'
import { useState} from "react"
import usersServices from "../services/users"

const CompletedButton = (props)=>{

  const [value, setvalue] = useState(null)
  const handleCompleted = (e,newValue)=>{
    setvalue(newValue)
  }

  return(
    <Box>
      <ToggleButtonGroup
        exclusive
        value={value}
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