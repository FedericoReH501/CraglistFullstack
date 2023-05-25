import { AppBar,Button,Toolbar,IconButton,Box,Grid} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';

const Navibar = ({user})=>{
  const dispatch = useDispatch()
  const logOut = ()=>{
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }
  return(
    <AppBar position="sticky" sx={{ borderradius: '16px',display:'flex' }}>
      <Toolbar>
      <IconButton
            component={Link} to="/"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
            CragList
       </IconButton>
        <Grid container>
          <Grid item md={11}></Grid>
          <Grid item md={1}>
            {user
            ? <Box>
                <em edge="end">{user.name} logged in</em>
                <Button onClick={logOut} sx={{color:'white'}}>Logout</Button>
              </Box>
            : <Button color="inherit" component={Link} to="/login" edge="emd">
                Login
              </Button>
            }   
        
          </Grid>
        </Grid>
        
          
                                   
  </Toolbar>
    </AppBar>
  )


}

export default Navibar