import './App.css'
import { Container,Box,CssBaseline, Paper, Typography, Button} from '@mui/material'
import Regions from './components/Regions'
import Crags from './components/Crags'
import Filter from './components/Filter'
import LoginForm from './components/LoginForm'
import NewUser from './components/NewUser'
import cragsService from './services/crags'
import usersServices from './services/users'
import { setCrags } from './reducers/showCragsReducer'

import { useDispatch,useSelector } from 'react-redux'
import {useEffect,useRef,createRef} from 'react'
import { useQuery } from 'react-query'
import {Routes, Route, Link,Outlet,
  useParams,
  useNavigate} from 'react-router-dom'
import { setUser } from './reducers/userReducer'
import Region from './components/Region'
import Vie from './components/Vie'
import Navibar from './components/Navibar'


function App() {
  const navigate = useNavigate()
  const cragsList = useSelector(state=>state.crags.cragsList)
  const filter = useSelector(state=>state.filter)
 
  
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch()
  
  useQuery('/crags',cragsService.getAll,{refetchOnWindowFocus: false,onSuccess:(result)=>{
    dispatch({type:'SET_CRAGS',payload:result.data})
    console.log('downloaded!!!!!!')
    window.localStorage.setItem('cragsList',JSON.stringify(result.data))
  }})

  useEffect(()=>{
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser')) 
    const cragsList = JSON.parse(window.localStorage.getItem('cragsList'))

    if(loggedUser){
      dispatch(setUser(loggedUser))
      usersServices.setToken(loggedUser.token)
      console.log('user on Localstorage')
    }
    if(cragsList){
      console.log('Craglist on Localstorage')
      dispatch(setCrags(cragsList))
    }
    
  },[dispatch])
  
  return (
    <CssBaseline>
      <Container>
         <Routes>
            <Route  
              path ='/' 
              element={
                <Box>
                  
                  <Navibar></Navibar>
                  <Paper>
                    <Button onClick={() => navigate('/italy')}>
                      Italy
                    </Button>
                  </Paper>
                  <Outlet />  
                </Box>
            }>
              <Route index path='/italy' element={
                  <Regions></Regions>
              }/>
              <Route index path='/italy/:region' element={
                <Box>
                  <Regions/>              
                  <Crags></Crags>
                  <Filter></Filter>
                </Box>
              }/>
              <Route index path='italy/:region/:crag' element={
                <Box>
                  <Regions/>              
                  <Crags/>
                  <Vie cragsList={cragsList}></Vie>
                </Box>
                  
              }/>
            </Route>
            
            <Route path='/login' element={<LoginForm></LoginForm>}/>
            <Route path='/user/newuser' element={<NewUser></NewUser>}/>
            
          </Routes>
          
        </Container>
    </CssBaseline>
    
    

  )
}

export default App;
