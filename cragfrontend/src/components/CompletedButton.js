import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material'
import FlashIcon from '@mui/icons-material/Bolt'
import EyeIcon from '@mui/icons-material/RemoveRedEye'
import BoyIcon from '@mui/icons-material/Boy'
import usersServices from '../services/users'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
const CompletedButton = (props) => {
    const dispatch = useDispatch()
    const handleCompleted = async (e, newValue) => {
        if (!props.user) {
            dispatch(
                setNotification({
                    message: `you must be logged to add favourites!`,
                    severity: 'info',
                })
            )
            setTimeout(() => {
                dispatch(setNotification(null))
            }, 2500)
            return null
        }
        if (props.completed) {
            const updatedCompleted = props.user.completedRoutes.filter(
                (v) => v.route._id !== props.via._id
            )
            const updatedUser = {
                ...props.user,
                completedRoutes: updatedCompleted,
            }
            try {
                const response = await usersServices.updateFavs(updatedUser)
                dispatch(setUser({ token: props.user.token, ...response.data }))
                window.localStorage.setItem(
                    'loggedUser',
                    JSON.stringify({
                        token: props.user.token,
                        ...response.data,
                    })
                )
            } catch (e) {
                console.error(e)
            }
        } else {
            const updatedCompleted = props.user.completedRoutes.concat({
                crag: props.crag,
                sector: props.sector,
                route: props.via._id,
                completionType: newValue,
            })
            let updatedUser = {}
            if (props.isWip) {
                const workInProg = props.user.workInProg.filter((element) => {
                    return element.route !== props.via._id
                })
                updatedUser = {
                    ...props.user,
                    workInProg,
                    completedRoutes: updatedCompleted,
                }
            } else {
                updatedUser = {
                    ...props.user,
                    completedRoutes: updatedCompleted,
                }
            }

            try {
                const response = await usersServices.updateFavs(updatedUser)
                dispatch(
                    setUser({
                        ...response.data,
                        token: props.user.token,
                    })
                )
                window.localStorage.setItem(
                    'loggedUser',
                    JSON.stringify({
                        ...response.data,
                        token: props.user.token,
                    })
                )
                console.log('updated user: ')
                console.log(updatedUser.completedRoutes)
                console.log('----------------')
            } catch (e) {
                console.error(e)
            }
        }
    }

    return (
        <Box>
            <ToggleButtonGroup
                exclusive
                value={props.completed}
                onChange={handleCompleted}
            >
                <ToggleButton value={'flash'}>
                    <FlashIcon></FlashIcon>
                </ToggleButton>
                <ToggleButton value={'onSight'}>
                    <EyeIcon />
                </ToggleButton>
                <ToggleButton value={'normal'}>
                    <BoyIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    )
}

export default CompletedButton
