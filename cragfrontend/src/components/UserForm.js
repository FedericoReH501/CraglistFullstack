const UserForm = ()=>{
  return(
    <div className='UserBox' style={{display:'none'}}>
        <form className="UserForm">
          <h4>Username</h4>
          <input
          type='text'
          name='newuserin'
          placeholder='Insert New Username'
          /><br/>

          <h4>email</h4>
          <input
          type='email'
          name='newemailin'
          placeholder='Insert Email'
          /><br/>
          
          <h4>region</h4>
          <input
          type='text'
          name='newregion'
          placeholder='your region'
          /><br/>
          
          <h4>Full Name</h4>
          <input
          type='text'
          name='newnamein'
          placeholder='Insert Full Name'
          /><br/>
          
          <h4>Password</h4>
          <input
            type='password'
            name='newpasswordin'
            placeholder='Insert New Password'
          /><br/>

          <button type="submit">Create Account</button>
        </form>
      </div>
  )
}

export default UserForm