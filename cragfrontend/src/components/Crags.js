import { useSelector } from "react-redux"
import { Box,Slide, Checkbox,List,Paper,Grow, Typography, TableHead, TableRow ,TableCell, TableContainer,Table, TableBody, Button} from "@mui/material"
import { useNavigate,useParams } from "react-router-dom"
import LikeButton from './LikeButton'

const Crags = (props)=>{
  const params = useParams()
  
  const cragsList = [...useSelector(({crags})=> {
    if(params.region){
      return crags.cragsList.filter(crag => crag.region === params.region.toUpperCase())
    }
      return crags.cragsList
    })]
  const user = useSelector(state=>state.user)
  console.log('user:',user)
  const navigate = useNavigate()
  const filter = useSelector(state=> state.filter)
  
  const requestedRange = filter.range
  
  const gradeMatcher=(crag,requested)=>{
    let point=0
    let result = []
    requested.forEach(grade=>{
      
        crag.sectors.forEach(sector=>
            sector.vie.forEach(via=>{
              
              if(grade===via.grade){
                  
                  point++
              }
          }
          ))
        let object ={
            grade: grade,
            ammount:point
        }
        result.push(object)
        
    })
    return [point,result]
  }

  const pointCalculator = (crag)=>{
    return gradeMatcher(crag,requestedRange)[0]
  }

  const comparer = (b,a)=>{
    let pointa= pointCalculator(a)
    let pointb = pointCalculator(b)
    return pointa - pointb
  }
  
  const isFavourite = (list,element)=>{

    if(list.includes(element))
    return true
    else{
      return false
    }
  }
  if(cragsList.length !== 0){
    if(params.crag){
      return(
        <Paper>
          <Typography variant="h5">
            {params.crag}
            
          </Typography>
        </Paper>
      )
    }
    cragsList.sort(comparer)
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden'}}  >
        <Slide  in={true} direction="up" mountOnEnter unmountOnExit >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead >
                <TableRow >
                  <TableCell> Crags</TableCell>
                  <TableCell> Exposition</TableCell>
                  <TableCell> Routes for You</TableCell>
                </TableRow>
                
              <TableRow>

              </TableRow>
            </TableHead>
                  <TableBody>
                      {cragsList.map((crag)=>
                      <TableRow key={crag.id}>
                        <TableCell  >
                          <Button onClick={()=>navigate(`${crag.name}`)}>
                            {crag.name}
                          </Button>
                            
                        </TableCell>
                        <TableCell  >
                          
                            
                        </TableCell>
                        
                      </TableRow>
                    )}
                  </TableBody>
            </Table>
          </TableContainer>
        </Slide>
      </Paper>
    )
  } 
}

export default Crags