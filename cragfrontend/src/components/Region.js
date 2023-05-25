import { Typography,IconButton, Button } from "@mui/material"
import LikeButton from "./LikeButton"
import { Link,useNavigate } from "react-router-dom"
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useDispatch,useSelector } from "react-redux"
import { setRegion } from "../reducers/cragsFilterReducer"
import { setUser } from "../reducers/userReducer"
import usersServices from "../services/users"

const Region=(props)=>{
const navigate= useNavigate()
const user = useSelector(state=>state.user)
const favsregions = user 
    ? user.favsRegions
    : []
const favsRegions = favsregions.map(r => r.toLowerCase())
const dispatch = useDispatch()


const findCrags =(region)=>{
  dispatch(setRegion(region))
}

const handleFav =async (region)=>{
    
  let newFavs=[]
  if(!isFavourite(region)){
    newFavs = favsRegions.concat(region)
    }
  else{
    newFavs = favsRegions.filter(r=> r !== region)
    
  }
  const updateduser = {...user,favsRegions:newFavs}
  dispatch(setUser(updateduser))
  window.localStorage.setItem('loggedUser',JSON.stringify(updateduser))
  await updateFavs(user,newFavs)
  }

  const isFavourite = (region)=>{

    if(favsRegions.includes(region))
    return true
    else{
      return false
    }
  }
  const updateFavs = async(regions,user)=>{
    const response = await usersServices.updateFavs(regions,user)
  }

  return(
    <div>
      <Button onClick={()=>{
        navigate(`/italy/${props.region.toLowerCase()}`)
        findCrags(props.region)}}
      >
          {props.region}
      </Button>
      
      <LikeButton 
        type={props.region}
        handleFav={handleFav}
        isFavourite={isFavourite}
        />
    </div>
  )
}

export default Region