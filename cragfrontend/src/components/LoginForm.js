import { useState } from 'react'
import loginService from '../services/login'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, TextField, Grid, CssBaseline, Paper, Button } from '@mui/material'
import { setUser } from '../reducers/userReducer'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
const LoginForm = () => {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logUser = async (credentials) => {
        try {
            const response = await loginService.login(credentials)
            window.localStorage.setItem('loggedUser', JSON.stringify(response))
            dispatch(setUser(response))
            navigate('/')
        } catch (e) {
            dispatch(
                setNotification({
                    message: `${e.response.data}`,
                    severity: 'error',
                })
            )
            setTimeout(() => {
                dispatch(setNotification(null))
            }, 2000)
        }
    }

    const handleLogin = (event) => {
        event.preventDefault()
        const credentials = {
            username: username,
            password: password,
        }
        logUser(credentials)
        setusername('')
        setpassword('')
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage:
                        'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light'
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <Box sx={{ mx: 4, my: 8 }}>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={(e) => handleLogin(e)}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="email"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            autoComplete="user-name"
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <Notification></Notification>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/user/newuser" variant="body2">
                                    {'Don t have an account? Sign Up'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default LoginForm
