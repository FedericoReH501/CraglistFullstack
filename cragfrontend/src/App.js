import './App.css'
import { Container, Box, CssBaseline, Paper, Button } from '@mui/material'
import Regions from './components/Regions'
import Crags from './components/Crags'
import Filter from './components/Filter'
import LoginForm from './components/LoginForm'
import NewUser from './components/NewUser'
import WipRoutes from './components/User/WipRoutes'
import usersServices from './services/users'
import { fetchCrags, setCrags } from './reducers/CragsReducer'
import FalesiaScraper from './scraper/FalesiaScraper'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import Image from './svg/back.svg' // Import using relative path
import {
    Routes,
    Route,
    Outlet,
    useNavigate,
    useLocation,
} from 'react-router-dom'
import { setUser } from './reducers/userReducer'
import Vie from './components/Vie'
import Navibar from './components/Navibar'
import BreadCrumb from './components/BreadCrumbs'
import UserShow from './components/User/UserShow'
import CompletedRoutes from './components/User/CompletedRoutes'
import gradeList from './utils/gradeList'
import Hero from './components/Hero'
import UserDrawer from './components/User/UserDrawe'
function App() {
    const navigate = useNavigate()
    const cragsList = useSelector((state) => state.crags.cragsList)
    //const isLoading = useSelector((state) => state.crags.isLoading)
    //const error = useSelector((state) => state.crags.error)
    const dispatch = useDispatch()
    useEffect(() => {
        const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
        const cragsList = JSON.parse(window.localStorage.getItem('cragsList'))

        if (loggedUser) {
            dispatch(setUser(loggedUser))
            usersServices.setToken(loggedUser.token)
            console.log('user on Localstorage: ')
            console.log(loggedUser)
            console.log('--------------')
        }
        if (cragsList) {
            console.log('Craglist on Localstorage')
            dispatch(setCrags(cragsList))
        } else {
            dispatch(fetchCrags())
        }
    }, [dispatch])
    const location = useLocation()
        .pathname.split('/')
        .filter((x) => x)

    return (
        <CssBaseline>
            <Container>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Box>
                                <Navibar></Navibar>
                                <Outlet />
                            </Box>
                        }
                    >
                        <Route index path="/home" element={<Hero></Hero>} />

                        <Route
                            path="/user/"
                            element={
                                <Box sx={{ p: 24 }}>
                                    <UserDrawer></UserDrawer>

                                    <Outlet></Outlet>
                                </Box>
                            }
                        >
                            <Route
                                idex
                                path="/user/main"
                                element={<UserShow></UserShow>}
                            />
                            <Route
                                idex
                                path="/user/completed"
                                element={<CompletedRoutes></CompletedRoutes>}
                            />
                            <Route
                                idex
                                path="/user/wip"
                                element={<WipRoutes></WipRoutes>}
                            />
                        </Route>
                        <Route
                            index
                            path="/finder/:nation"
                            element={
                                <Box>
                                    <BreadCrumb></BreadCrumb>
                                    <Regions></Regions>
                                </Box>
                            }
                        />
                        <Route
                            index
                            path="/finder/italy/:region"
                            element={
                                <Box>
                                    <BreadCrumb></BreadCrumb>
                                    <Crags></Crags>
                                    <Filter gradeList={gradeList}></Filter>
                                </Box>
                            }
                        />
                        <Route
                            index
                            path="/finder/italy/:region/:crag"
                            element={
                                <Box>
                                    <BreadCrumb></BreadCrumb>
                                    <Vie
                                        cragsList={cragsList}
                                        gradeList={gradeList}
                                    ></Vie>
                                </Box>
                            }
                        />
                    </Route>

                    <Route path="/login" element={<LoginForm></LoginForm>} />
                    <Route
                        path="/user/newuser"
                        element={<NewUser gradeList={gradeList}></NewUser>}
                    />
                    <Route
                        path="/scraper"
                        element={
                            <Paper>
                                <FalesiaScraper></FalesiaScraper>
                            </Paper>
                        }
                    />
                </Routes>
            </Container>
        </CssBaseline>
    )
}

export default App
