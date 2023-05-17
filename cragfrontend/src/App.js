import './App.css'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import cragsService from './services/crags'
import usersServices from './services/users'

import {useState,useEffect,} from 'react'
import {Routes,Route,Link,useNavigate} from 'react-router-dom'
import {useQuery,useMutation} from 'react-query'
import Header from './components/Header'
import Regions from './components/Regions'


function App() {
  const [user, setuser] = useState(null)
  const [favRegions, setfavRegions] = useState([])
  const navigate = useNavigate()
  
  useEffect(()=>{
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser')) 
    if(loggedUser){
      setuser(loggedUser)
      setfavRegions(loggedUser.favsRegions)
      usersServices.setToken(loggedUser.token)
    }
  },[])

  //const result = useQuery('crags',cragsService.getAll,{
    //false
  //})
  /*if ( result.isLoading ) {
      return <div>loading data...</div>
    }*/

  
  
  const logUser = async (credentials)=>{
    try{
      const response = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser',JSON.stringify(response))
      setuser(response)
      setfavRegions(response.favsRegions)
      navigate('/')
    }catch(e){ console.error(e.response.data)}
  }

  const logOut = ()=>{
    window.localStorage.removeItem('loggedUser')
    setuser(null)
  }

  const findCrags =async  (region)=>{
    const cragList = await cragsService.getByRegion(region)
    console.log('findCrags')
    window.localStorage.setItem('filteredcraglist',JSON.stringify(cragList))
  }

  const updateFavs = async(regions,user)=>{
    console.log('updatefavsfav')
    const response = await usersServices.updateFavs(regions,user)
  }
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
      console.log('make favourite')
      newFavs = favRegions.concat(region)
       setfavRegions( newFavs)
      }
    else{
      console.log('remve from favourites')
      newFavs = favRegions.filter(r=> r !== region)
      setfavRegions(newFavs)
    }
    const updateduser = {...user,favsRegions:newFavs}
   
    await updateFavs(user,newFavs)
    window.localStorage.setItem('loggedUser',JSON.stringify(updateduser))
    setuser(updateduser)
    }
  console.log('app user favs and favs',user,favRegions)
  return (
    <div className="App">
      
    <Header user={user} logOut={logOut}><Link to='/login'>LOGIN</Link></Header>
              
     <Routes>
          <Route path='/' element={
            <Regions 
              handleFav={handleFav}
              favRegions={favRegions}
              findCrags={findCrags}
            />}>
            
          </Route>
          <Route path={'/login'} element={<LoginForm logUser={logUser} />}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
