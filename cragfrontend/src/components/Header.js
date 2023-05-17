const Header = (props)=>{

return(
  <header className='Header'>
    <h1 className="Title">CRAGLIST</h1>
    {props.user 
      ?<div className="Title">
        {props.user.name} logged
        <button onClick={props.logOut}>LogOut</button>
      </div>
      :props.children
    }     
  </header>
)

}

export default Header