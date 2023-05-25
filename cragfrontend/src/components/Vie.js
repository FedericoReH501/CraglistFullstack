import { Box,Slide, Checkbox,List,Paper,Grow, Typography, TableHead, TableRow ,TableCell, TableContainer,Table, TableBody, Button, IconButton} from "@mui/material"
import { useParams } from "react-router-dom"
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import SportsGymnasticsOutlinedIcon from '@mui/icons-material/SportsGymnasticsOutlined';

const Vie = (props)=>{
  const selectedCrag = useParams().crag
  
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
                    <TableCell><IconButton><TaskAltOutlinedIcon/></IconButton></TableCell>
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