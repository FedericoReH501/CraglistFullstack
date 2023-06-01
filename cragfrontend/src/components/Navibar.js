import { AppBar, Toolbar, Box, Button, Grid, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'

const Navibar = () => {
    const user = useSelector((s) => s.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logOut = () => {
        navigate('/')
        window.localStorage.removeItem('user')
        dispatch(setUser(null))
    }
    return (
        <Box>
            <AppBar position="static">
                <Box sx={{ width: '100%' }}></Box>
                <Toolbar>
                    <Grid container>
                        <Grid item md={5}>
                            <Button
                                color="inherit"
                                onClick={() => navigate('/')}
                            >
                                home
                            </Button>
                        </Grid>
                        <Grid item md={5}>
                            <Button
                                color="inherit"
                                onClick={() => navigate('/user')}
                            >
                                User
                            </Button>
                        </Grid>

                        <Grid item md={1}>
                            {user === null ? (
                                <Button
                                    color="inherit"
                                    onClick={() => navigate('/login')}
                                >
                                    login
                                </Button>
                            ) : (
                                <Box>
                                    <Typography component={'div'}>
                                        {user.name}
                                    </Typography>
                                    <Button color="inherit" onClick={logOut}>
                                        logout
                                    </Button>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navibar
