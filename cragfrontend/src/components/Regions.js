import { useSelector } from "react-redux"
const allRegions = ['Abruzzo','Basilicata','Calabria','Campania','Emilia Romagna','Friuli venezia giulia','Lazio','Liguria', 'Lombardia','Marche','Molise','Piemonte','Puglia', 'Sardegna','Sicilia','Toscana','Trentino alto adige','Umbria',"Val d'Aosta"]

const Regions = ({findCrags,favRegions,handleFav})=>{
  const user = useSelector(state=>state)
  console.log('REGIONS user:',user)
  const regions = favRegions===[] 
                  ? allRegions
                  :[...favRegions.sort(), ...allRegions.filter(r => !favRegions.includes(r))]
  
  
  const className = bool=>bool ?'FavRegion':'Region'
  const isFavourite = (region)=>{
    if(favRegions.includes(region))
    return true
    else{
      return false
    }
  }
  
  return(
    <div>
       {regions.map(region=>
            <div key={region} className={className(isFavourite(region))}> 
              <div  key={region} >
                <span>{region}</span>
                <button onClick={()=>findCrags(region)}> findcrags</button>
                <button onClick={()=>handleFav(region)}>
                { isFavourite(region)
                  ? 'remove from favourites'
                  :'add to favourites'
                }
              </button>
              </div>
              
            </div>
        )
        }
    </div>
     
    
  )
}

export default Regions