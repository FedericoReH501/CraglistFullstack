import './App.css'
import LoginForm from './components/LoginForm'
import Regions from './components/Regions'
import UserForm from './components/UserForm'
import loginService from './services/login'
import cragsService from './services/crags'
import {useState,useEffect} from 'react'
import usersServices from './services/users'
import FileImport from './components/FileImport'

function App() {
  const [user, setuser] = useState(null)
  useEffect(()=>{
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser')) 
    if(loggedUser){
      setuser(loggedUser)
      usersServices.setToken(loggedUser.token)
    }
  },[])
  
  const logUser = async (credentials)=>{
    try{
      const response = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser',JSON.stringify(response))
      setuser(response)
    }catch(e){ console.error(e.response.data)}
  }

  const logOut = ()=>{
    window.localStorage.removeItem('loggedUser')
    setuser(null)
  }

  const findCrags = (region)=>{
    cragsService.getByRegion(region)
  }

  const updateFavs = async(regions,user)=>{
    const response = await usersServices.updateFavs(regions,user)
  }

  return (
    <div className="App">
      <header className='Header'>
        <h1>CRAGLIST</h1>
        {user && (<div>
          {user.name} logged in 
          <button onClick={logOut}>Log Out</button>
          </div>)}
      </header>
     {!user && <LoginForm logUser={logUser} />}
     {user && <Regions 
     findCrags={findCrags}
     updateFavs={updateFavs}
     user={user}/>}
      <UserForm/>
      <FileImport/>
    </div>
  );
}

export default App;
