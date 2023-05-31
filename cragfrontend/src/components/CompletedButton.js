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
            console.log('isCompleted')

            const updatedCompleted = props.user.completedRoutes.filter(
                (v) => v.route !== props.via.route_id
            )
            const updatedUser = {
                ...props.user,
                completedRoutes: updatedCompleted,
            }
            try {
                await usersServices.updateFavs(updatedUser)
                dispatch(setUser(updatedUser))
                window.localStorage.setItem(
                    'loggedUser',
                    JSON.stringify(updatedUser)
                )
            } catch (e) {
                console.error(e)
            }
        } else {
            const updatedCompleted = props.user.completedRoutes.concat({
                crag: props.via.crag_id,
                route: props.via.route_id,
                completionType: newValue,
            })
            let updatedUser = {}
            if (
                props.user.workInProg.find(
                    (route) => route._id === props.via.route_id
                )
            ) {
                const workInProg = props.user.workInProg.filter((route) =>
                    route._id === props.via.route_id ? null : v
                )
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
                await usersServices.updateFavs(updatedUser)
                dispatch(setUser(updatedUser))
                window.localStorage.setItem(
                    'loggedUser',
                    JSON.stringify(updatedUser)
                )
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
