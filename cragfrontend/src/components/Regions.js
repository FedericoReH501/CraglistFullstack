import {useState} from 'react'

const allRegions = ['Abruzzo','Basilicata','Calabria','Campania','Emilia','Friuli','Lazio','Liguria', 'Lombardia','Marche','Molise','Piemonte','Puglia', 'Sardegna','Sicilia','Toscana','Trentino','Umbrbia',"Val d'Aosta"]

const Regions = ({findCrags,user,updateFavs})=>{
  
  const [favRegions, setfavRegions] = useState(user.favsRegions ? user.favsRegions : [])
  const regions = [...favRegions, ...allRegions.filter(r => !favRegions.includes(r))]

  const isFavourite = (region)=>{
    if(favRegions.includes(region))
    return true
    else{
      return false
    }
  }
  const handleFav =async (region)=>{
    let newFavs=[]
    if(!isFavourite(region)){
      newFavs = favRegions.concat(region)
       setfavRegions( newFavs)
      }
    else{
      newFavs = favRegions.filter(r=> r !== region)
      setfavRegions(newFavs)
    }
    await updateFavs(user,newFavs)
    }
   
  const className = bool=>bool ?'FavRegion':'Region'

  
  return(
    <div>
       {regions.map(region=>{
        const favourite = isFavourite(region)
        return (
            <div key={region}>
              <div 
                className={className(favourite)} 
                onClick={()=>findCrags('lazio')} 
              >
                <h1>{region}</h1>
              
              </div>
              <button onClick={()=>handleFav(region)}>
                {
                favourite 
                ? 'remove from favourites'
                :'add to favourites'
                }
              </button>
            </div>
        )
        })}
    </div>
     
    
  )
}

export default Regions