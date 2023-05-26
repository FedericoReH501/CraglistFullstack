import { Box,Slide, Checkbox,List,Paper,Grow, Typography, TableHead, TableRow ,TableCell, TableContainer,Table, TableBody, Button, IconButton} from "@mui/material"
import { useParams } from "react-router-dom"
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import SportsGymnasticsOutlinedIcon from '@mui/icons-material/SportsGymnasticsOutlined'
import CompletedButton from "./CompletedButton"
import { useSelector } from "react-redux";


const Vie = (props)=>{
  const selectedCrag = useParams().crag
  const user = useSelector(s => s.user )
  console.log('user vie',user)
  const completed = user ? user.completed :[]
  const isCompleted = (via)=>{
    completed.forEach(element => {
      if(element.name === via.name && element.grade === via.grade){
        return element.how
      }
      else{ return null}
    })
  }
  const crag = props.cragsList.find(c=>c.name === selectedCrag)
  
  if(crag){
    return(
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
                    <TableCell> Completed</TableCell>
                    <TableCell> Work in Prog.</TableCell>
                    
                  </TableRow>
              </TableHead>
              <TableBody>
                {s.vie.map((v,index)=>
                  <TableRow key={`${v.name}${s.sectorName}${index}`}>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.grade}</TableCell>
                    <TableCell><CompletedButton completed={isCompleted(v) } user={user} via={v}/></TableCell>
                    <TableCell><IconButton><SportsGymnasticsOutlinedIcon/></IconButton></TableCell>
                  </TableRow>
                )}
              </TableBody>
              </Table>
              
            </TableContainer>
            
          
          </Box>
          
          )}
      </Box>
    </Paper>
      
    )
  }
  
}

export default Vie