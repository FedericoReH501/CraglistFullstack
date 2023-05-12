import {useState} from 'react'

const LoginForm = ({logUser})=>{
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

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