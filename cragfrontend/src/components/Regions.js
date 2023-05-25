import { useSelector,useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { setRegion,setShow } from "../reducers/cragsFilterReducer"
import usersServices from '../services/users'
import { Switch,Grid,Container,Box, Typography,Paper, Card, CardContent,CardActions, IconButton,Drawer,toggleDrawer,Button,Slide,FormControlLabel} from "@mui/material"
import { useParams } from "react-router-dom"
import Region from "./Region"

const allregions = ['Abruzzo','Basilicata','Calabria','Campania','Emilia Romagna','Friuli venezia giulia','Lazio','Liguria', 'Lombardia','Marche','Molise','Piemonte','Puglia', 'Sardegna','Sicilia','Toscana','Trentino alto adige','Umbria',"Val d'Aosta"]
const allRegions = allregions.map(r => r.toLocaleLowerCase())
const Regions = (props)=>{
  const params = useParams()
  const user = useSelector(state=>state.user)
  const filter = useSelector(state=>state.filter)
  const dispatch = useDispatch()
  console.log('region user')
  const favsregions = user 
    ? user.favsRegions
    : []
  console.log('favs:',favsregions)
  const favsRegions = favsregions.map( r => r.toLowerCase() ) 
  
  const regions = favsRegions === [] 
                  ? allRegions
                  :[...favsRegions, ...allRegions.filter(r => !favsRegions.includes(r))]
  
  
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

    const findCrags =async  (region)=>{
      //const cragList = await cragsService.getByRegion(region)
      dispatch(setRegion(region))
      //window.localStorage.setItem('filteredcraglist',JSON.stringify(cragList))
    }
    const showAll = ()=>{
      dispatch(setShow())
    }

  if(params.region){
    return(
      <Paper>
        <Region 
            region={params.region}
            handleFav={handleFav}
            findCrags={findCrags}
            updateFavs={updateFavs}
            isFavourite={isFavourite}
        />
      </Paper>
    )
  }
  return(
    <Paper elevation={5} sx={{borderradius:5,p:2}}>
        <Grid container spacing={2} my={2}>
                {regions.map(region=>
                  <Grid 
                    key={region}
                    item md={4} 
                    sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                      
                          <Region 
                            region={region}
                            handleFav={handleFav}
                            findCrags={findCrags}
                            updateFavs={updateFavs}
                            isFavourite={isFavourite}
                            />
                  </Grid>
                )}

        </Grid>
      </Paper>
  )
}

export default Regions