import {useState} from 'react'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const LoginForm = ()=>{
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logUser = async (credentials)=>{
    try{
      const response = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser',JSON.stringify(response))
      dispatch({type:'SET_USER',payload:response})
      navigate('/')
    }catch(e){ console.error(e.response.data)}
  }

  const handleLogin=(event)=>{
    console.log('handle login')
   
    event.preventDefault()
    const credentials = {
      username: username,
      password:password
    }
    console.log('credentials',credentials)
    logUser(credentials)
    setusername('')
    setpassword('')
  }

  return(
    <div className='LogBox'>
        <form onSubmit={(e)=>handleLogin(e)}>
          <input
          type='text'
          name='userin'
          placeholder='Insert Username'
          value={username}
          onChange={(e)=> setusername(e.target.value)}
          />
          <input
            type='password'
            name='passwordin'
            placeholder='Insert Password'
            value={password}
            onChange={(e)=> setpassword(e.target.value)}
          />
          <button type="submit">LOGIN</button>
        </form>
      </div>
  )
}

export default LoginForm