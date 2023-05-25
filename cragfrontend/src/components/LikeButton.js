import {IconButton} from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'



const LikeButton = (props)=>{
    
  return(
    <>
      <IconButton onClick={() => props.handleFav(props.type)}>
                { props.isFavourite(props.type)
                    ? <FavoriteIcon color="primary"/>
                    : <FavoriteBorderIcon color="primary"/>
                  }                        
      </IconButton>
    </>
    
  )
}

export default LikeButton