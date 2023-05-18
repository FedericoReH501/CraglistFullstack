import { useSelector,useDispatch } from "react-redux"
import usersServices from '../services/users'


const allRegions = ['Abruzzo','Basilicata','Calabria','Campania','Emilia Romagna','Friuli venezia giulia','Lazio','Liguria', 'Lombardia','Marche','Molise','Piemonte','Puglia', 'Sardegna','Sicilia','Toscana','Trentino alto adige','Umbria',"Val d'Aosta"]

const Regions = (props)=>{
  const user = useSelector(state=>state.user)
  const showCrags = useSelector(state=>state.crags)
  const dispatch = useDispatch()
  const favsRegions = user 
    ? user.favsRegions
    : []
    
  const regions = favsRegions===[] 
                  ? allRegions
                  :[...favsRegions, ...allRegions.filter(r => !favsRegions.includes(r))]
  
  
  const className = bool=>bool ?'FavsRegion':'Region'
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

    window.localStorage.setItem('loggedUser',JSON.stringify(updateduser))
    dispatch({type:'SET_USER',payload:updateduser})
    await updateFavs(user,newFavs)
    }
    const findCrags =async  (region)=>{
      //const cragList = await cragsService.getByRegion(region)
      dispatch({type:'SWITCH_CRAGS_VISIBILITY',payload:region})
      //window.localStorage.setItem('filteredcraglist',JSON.stringify(cragList))
    }
    const showAll = ()=>{
      dispatch({type:'SWITCH_CRAGS_VISIBILITY',payload:null})
    }
  return(
    <div>
      
      {showCrags.show 
        ? <div >
          
            <div  className='selectedRegion FavsRegion'>
              {showCrags.region}
              <button onClick={showAll}> Show All Regions</button>
            </div>
            <h2>Falesie:</h2>
            {props.children}
          </div>
        
        : <div className="RegionsBox">
          
          {regions.map(region=>
          <div key={region} className={className(isFavourite(region))}> 
            <div  key={region} >
              <span onClick={()=>findCrags(region)}>{region}</span>
             
              {user && <button onClick={()=>handleFav(region)}>
              { isFavourite(region)
                ? 'remove from favourites'
                : 'add to favourites'
              }
              </button>}
              
            </div>
          </div>)}
          </div>  
        }
    </div>
     
    
  )
}

export default Regions