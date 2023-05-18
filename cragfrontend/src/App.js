import './App.css'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Regions from './components/Regions'
import Crags from './components/Crags'
import Filter from './components/Filter'

import cragsService from './services/crags'
import usersServices from './services/users'

import { useDispatch,useSelector } from 'react-redux'
import {useEffect,} from 'react'
import { useQuery } from 'react-query'
import {Routes,Route,Link} from 'react-router-dom'

function App() {
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch()
  
  const result = useQuery('crags',cragsService.getAll,{refetchOnWindowFocus: false,onSuccess:(result)=>{
    dispatch({type:'SET_CRAGS',payload:result.data})

    window.localStorage.setItem('cragsList',JSON.stringify(result.data))
  }})

  useEffect(()=>{
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser')) 
    const cragsList = JSON.parse(window.localStorage.getItem('cragsList'))
    if(loggedUser){
      dispatch({type:'SET_USER',payload:loggedUser})
      usersServices.setToken(loggedUser.token)
    }
    if(cragsList){
      dispatch({type:'SET_CRAGS',payload:cragsList})
    }
    else{
      if ( result.isLoading ) {
        return <div>loading data...</div>
      }
    }
  },[dispatch])

  

  const logOut = ()=>{
    window.localStorage.removeItem('loggedUser')
    dispatch({type:'SET_USER',payload:null})
  }
  JSON.parse(window.localStorage.getItem('cragsList')).forEach(c=>{
     console.log('name:',c.name)
    console.log('expos:',c.exposition)
    console.log('-----------------------------------')
  }
   
    )
  return (
    <div className="App">
    <Header user={user} logOut={logOut}>
      <Link to='/'>HOME </Link>
      <Link to='/login'> LOGIN</Link>
    </Header>        
     <Routes>
          <Route path='/' element={<Regions> <Crags/><Filter/></Regions>}></Route>
          <Route path='/login' element={<LoginForm/>}></Route>
          
      </Routes>
     
    </div>
  );
}

export default App;
