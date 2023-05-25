import { AppBar,Toolbar,Box, Button, Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const Navibar = ()=>{
  const user = useSelector(s=>s.user)
  console.log(user)
  const navigate = useNavigate()
  return(
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid item md={11}>
              <Button color="inherit" onClick={()=>navigate('/')}>
                          home
              </Button>
            </Grid>

            <Grid item md={1}>
                {user === null
                  ?<Button color="inherit" onClick={()=>navigate('/login')}>
                      login
                    </Button>
                  :<Box>
                    <Typography component={'div'}>
                      {user.name} logged in
                    </Typography>
                    <Button color="inherit">
                      
                      logout
                    </Button>
                  </Box>
                
                }
                
            </Grid>

          </Grid> 
        </Toolbar>
      </AppBar>
    </Box>
    
  )
  
}

export default Navibar