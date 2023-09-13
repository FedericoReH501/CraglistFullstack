import {
    AppBar,
    Toolbar,
    Box,
    Button,
    Grid,
    Typography,
    Tabs,
    Tab,
    useMediaQuery,
    Slider,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import { styled } from '@mui/system'
import { useState } from 'react'
import gradeList from '../utils/gradeList'

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
    const isSmallScreen = useMediaQuery('(max-width:600px)')

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
            <MyAppBar elevation={2}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={9} lg={3}>
                            <Tabs value={value} onChange={handleChange}>
                                <TabLink
                                    to={'/home'}
                                    label="Home"
                                    value={'home'}
                                />
                                <TabLink
                                    to={'/finder/italy'}
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
                            xs={3}
                            lg={9}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                ...(isSmallScreen && { display: 'none' }), // Conditionally hide on small screens
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
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flexBasis: '50%',
                                            flexGrow: 1,
                                            px: 3,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography>{user.name}</Typography>
                                        <Typography px={3}>LV: </Typography>
                                        <Slider max={35} value={user.level} />
                                        <Typography px={3}>
                                            {gradeList[user.level]}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            flexGrow: 1,
                                            flexBasis: '50%',
                                        }}
                                    >
                                        <Button
                                            color="inherit"
                                            onClick={logOut}
                                        >
                                            logout
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </MyAppBar>
        </Box>
    )
}

export default Navibar
