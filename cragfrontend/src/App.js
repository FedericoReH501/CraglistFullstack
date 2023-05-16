import './App.css'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import cragsService from './services/crags'
import {useState,useEffect,} from 'react'
import {Routes,Route,Link,useNavigate} from 'react-router-dom'
import usersServices from './services/users'
import { useQuery,useMutation, } from 'react-query'


function App() {
  const [user, setuser] = useState(null)
  const navigate = useNavigate()
  
  useEffect(()=>{
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser')) 
    if(loggedUser){
      setuser(loggedUser)
      usersServices.setToken(loggedUser.token)
    }
  },[])

  const result = useQuery('crags',cragsService.getAll,{
    refetchOnWindowFocus: false
  })
  if ( result.isLoading ) {
      return <div>loading data...</div>
    }

  
  
  const logUser = async (credentials)=>{
    try{
      const response = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser',JSON.stringify(response))
      setuser(response)
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
    const response = await usersServices.updateFavs(regions,user)
  }

  return (
    <div className="App">
      
      <header className='Header'>
        <h1>CRAGLIST</h1>
        {user ?<div>
                {user.name} logged
                <button onClick={logOut}>LogOut</button>
              </div>
              :<Link to='/login'>LOGIN</Link>
        }
        
      </header>
     <Routes>
          <Route path='/' element={<div></div>}></Route>
          <Route path={'/login'} element={<LoginForm logUser={logUser} />}></Route>
    </Routes>
     
    </div>
  );
}

export default App;
