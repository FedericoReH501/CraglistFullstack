import {
    AppBar,
    Toolbar,
    Box,
    Button,
    Grid,
    Typography,
    Tabs,
    Tab,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import { styled } from '@mui/system'
import { useState } from 'react'

const MyAppBar = styled(AppBar)(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
}))

const TabLink = (props) => {
    return (
        <Tab
            component={Link}
            sx={{ color: 'secondary.main', fontWeight: 'bold' }}
            {...props}
        ></Tab>
    )
}

const Navibar = () => {
    const user = useSelector((s) => s.user)

    const location = useLocation()

    const [value, setValue] = useState(location.pathname.split('/')[1])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChange = (e, newValue) => {
        setValue(newValue)
    }
    const logOut = () => {
        navigate('/')
        window.localStorage.removeItem('loggedUser')
        dispatch(setUser(null))
    }
    return (
        <Box sx={{ position: 'absolute', zIndex: 10 }}>
            <MyAppBar elevation={5}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={6} lg={6}>
                            <Tabs value={value} onChange={handleChange}>
                                <TabLink
                                    to={'/home'}
                                    label="Home"
                                    value={'home'}
                                />
                                <TabLink
                                    to={'/finder'}
                                    label="Finder"
                                    value={'finder'}
                                />
                                <TabLink
                                    to={'/user/main'}
                                    label="User"
                                    value={'user'}
                                />
                            </Tabs>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            lg={6}
                            sx={{ display: 'flex', justifyContent: 'flex-end' }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'right',
                                    justifyContent: 'flex-end',
                                }}
                            >
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
                                        <Button
                                            color="inherit"
                                            onClick={logOut}
                                        >
                                            logout
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </MyAppBar>
        </Box>
    )
}

export default Navibar
