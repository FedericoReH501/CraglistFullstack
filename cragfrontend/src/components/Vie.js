import { Box,Paper,Typography, TableHead, TableRow ,TableCell, TableContainer,Table, TableBody,IconButton, Breadcrumbs,Slide} from "@mui/material"
import { Link, useParams } from "react-router-dom"

import CompletedButton from "./CompletedButton"
import WIPButton from "./WIPButton"
import { useSelector } from "react-redux"


const Vie = (props)=>{

  const selectedCrag = useParams().crag
  const user = useSelector(s => s.user )
  const region = useParams().region
  const completed = user ? user.completed :[]
  const wip = user ? user.workInProg : []
  const isCompleted = (via)=>{
    let result = null
    completed.forEach(element => {
      
      if(element.name === via.name && element.grade === via.grade){
        result = element.how
      }
    })
    return result
  }

  const crag = props.cragsList.find(c=>c.name === selectedCrag)
  
  if(crag){
    return(
  <Slide  in={true} direction="up" mountOnEnter unmountOnExit >
    <Paper>
      
      <Box>
        {crag.sectors.map(s=>
          <Box key={s.sectorName}>
            <Typography variant="h5">
              {s.sectorName}
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }} >
              <Table stickyHeader>
              <TableHead >
                  <TableRow >
                    <TableCell> Name</TableCell>
                    <TableCell> Grade</TableCell>
                    <TableCell> Work in Prog.</TableCell>
                    <TableCell> Completed</TableCell>
                    
                  </TableRow>
              </TableHead>
              <TableBody>
                {s.vie.map((v,index)=>
                  <TableRow key={`${v.name}${s.sectorName}${index}`}>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.grade}</TableCell>
                    <TableCell><WIPButton wip={wip} completed={completed} user={user} via={{...v,crag:crag.name,region:region}}/></TableCell>
                    <TableCell><CompletedButton completed={isCompleted(v)} user={user} via={{...v,crag:crag.name,region:region}} wip={wip}/></TableCell>
                  </TableRow>
                )}
              </TableBody>
              </Table>
              
            </TableContainer>
            
          
          </Box>
          
          )}
      </Box>
    </Paper>
  </Slide>
      
    )
  }
  
}

export default Vie