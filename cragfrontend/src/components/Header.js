import {Link} from 'react-router-dom'

const Header = (props)=>{

return(
  <header >
    <div className='grid-container'>
      <div className='logo'><h1 className="Title">CRAGLIST</h1></div>
      <div className='links'>
        <div><Link to='/'>HOME </Link></div>
        
      </div>
      <div className='userHead'>
        {props.user 
        ?<div className="Title">
          {props.user.name} logged
          <button onClick={props.logOut}>LogOut</button>
        </div>
        :<Link to='/login'> LOGIN</Link>
        } 
      </div>
    </div>    
  </header>
)

}

export default Header