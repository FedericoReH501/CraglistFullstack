import { Box,Typography,Grid,Link,Button,Zoom,Paper, Container, TextField, Stepper, Step, StepLabel, Slider } from "@mui/material"
import { useTextInput } from "../hooks"
import { useState } from "react"
import usersServices from "../services/users"
import loginServices from "../services/login"
import { useNavigate } from "react-router-dom"
import Icon from '@mui/icons-material/CheckCircleOutline'
import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"

const NewUser = ({gradeList})=>{
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const firstName = useTextInput('First Name')
  const secondName = useTextInput('Second Name')
  const userName = useTextInput('Username')
  const password = useTextInput('password')
  const email = useTextInput('email')
  const [step, setStep] = useState(0)
  const [level, setLevel] = useState(17)
  
  let storedStep = Number(window.localStorage.getItem('step'))
  
  const handleNext = (e)=>{
    e.preventDefault()
    
    const data = {
      name:firstName.value,
      surname:secondName.value,
      username:userName.value,
      email:email.value,
      password:password.value
    }
    setStep(1)
    window.localStorage.setItem('step',1)
    window.localStorage.setItem('step1_data',JSON.stringify(data))
  }
  const logUser = async (credentials)=>{
    try{
      const response = await loginServices.login(credentials)
      window.localStorage.setItem('loggedUser',JSON.stringify(response))
      dispatch(setUser(response))
      navigate('/')
    }catch(e){ console.error(e.response.data)}
  }
    
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const credentialsStep1 =JSON.parse(window.localStorage.getItem('step1_data')) 
    const userObj = {...credentialsStep1, level:gradeList[level.value]}
    const response = await usersServices.createNew(userObj)
    const username = response.username
    const password = credentialsStep1.password
    logUser({username,password})
   
    storedStep = 2
    window.localStorage.setItem('step',2)
    setStep(3)
    setTimeout(() => {
      window.localStorage.clear()
      navigate('/')
    }, 1500);
  }
  
  return(
    <div>
      <Container maxWidth='xs'>
        <Box
          sx={{display:'flex',alignItems:'center',flexDirection:'column',marginTop:8}}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box my={2} width='100%'>
          <Stepper activeStep={storedStep} alternativeLabel >
            <Step>
              <StepLabel>Insert Your Data</StepLabel>
            </Step>
            <Step>
              <StepLabel>Climbing Level</StepLabel>
            </Step>
            <Step>
              <StepLabel>Complete</StepLabel>
            </Step>
          </Stepper>
          
          </Box>
          {storedStep === 0 &&
            <Box  component='form'  sx={{my:3}} onSubmit={(e)=>handleNext(e)}>
            <Grid container spacing={2}>
              <Grid item md={6} sm={6}>
                <TextField
                  {...firstName}
                  required
                  fullWidth
                  autoFocus
                ></TextField>
              </Grid>
              <Grid item md={6} sm={6}>
                <TextField
                  {...secondName}
                  
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  {...userName}
                  required
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  {...email}
                  required
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  {...password}
                  required
                  fullWidth
                  
                  
                ></TextField>
              </Grid>
              
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{my:2}}
              >
                next
              </Button>
            <Grid container sx={{justifyContent:'flex-end'}}>
              <Grid item>
              <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          }
          {storedStep === 1 &&

          <Box sx={{display:'flex',alignItems:'center',flexDirection:'column',marginTop:8}}>
            <Typography my={2}>
              Set Your Climbing Level!
            </Typography>
            <Typography variant="h5">{gradeList[level]}</Typography>
            <Box component='form' noValidate sx={{my:3}} onSubmit={handleSubmit}>
            <Grid item md={12} sm={12}>
              <Slider
                required
                size='medium'
                max={35}
                value={level}
                onChange={(e)=>{setLevel(e.target.value)}}
              />
            </Grid>
            <Typography my={2}>
              Don't Lie!
            </Typography>
            <Grid container spacing={2}>
              <Grid item md={6} sm={6}>
              <Button
                  fullWidth
                  sx={{my:2}}
                  onClick={()=>{
                    storedStep = 0
                    window.localStorage.setItem('step',0)
                    setStep(3)
                  
                  }}
                >
                Back
              </Button>
              </Grid>
              <Grid item md={6} sm={6}>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{my:2}}
                >
                Submit
              </Button>
              </Grid>
            </Grid>
            
            <Grid container sx={{justifyContent:'flex-end'}}>
              <Grid item>
              <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          </Box>
          }
          {storedStep === 2 &&
            <Box>
              <Zoom in={true}>
                <Box sx={{display:'flex',flexDirection:'column',py:2,justifyContent:'center'}}>
                  <Icon fontSize="300px"/>
                  <Typography variant="h3">
                    Completed!
                  </Typography>
                </Box>
                
              </Zoom>
            </Box>
          }
        </Box>
      </Container>

    </div>
  )
}
 export default NewUser