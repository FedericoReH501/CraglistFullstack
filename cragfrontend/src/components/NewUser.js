import { Box,Typography,Grid,Link,Button,Paper, Container, TextField, Stepper, Step, StepLabel, Slider } from "@mui/material"
import { useTextInput } from "../hooks"
import { useState } from "react"
const handleSubmit = ()=>{
}

const NewUser = ()=>{
  const firstName = useTextInput('First Name')
  const secondName = useTextInput('Second Name')
  const userName = useTextInput('Username')
  const password = useTextInput('Password')
  const [step, setStep] = useState(0)
  const [level, setLevel] = useState(17)
  window.localStorage.setItem('step',step)
  const storedStep = Number(window.localStorage.getItem('step'))
  
  const handleNext = (e)=>{
    e.preventDefault()
    setStep(step + 1)
   
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    setStep(step + 1)
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
            <Box component='form'  sx={{my:3}} onSubmit={(e)=>handleNext(e)}>
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
                  required
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
            <Typography variant="h5">{level}</Typography>
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
                    setStep(step - 1)
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

            </Box>
          }
        </Box>
      </Container>

    </div>
  )
}
 export default NewUser