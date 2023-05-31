import { ToggleButton } from '@mui/material'
import SportsGymnasticsOutlinedIcon from '@mui/icons-material/SportsGymnasticsOutlined'
import usersServices from '../services/users'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const WIPButton = (props) => {
    const dispatch = useDispatch()
    const onClick = async () => {
        if (!props.user) {
            dispatch(
                setNotification({
                    message: `you must be logged to add favourites!`,
                    severity: 'info',
                })
            )
            setTimeout(() => {
                dispatch(setNotification(null))
            }, 3000)
            return null
        }
        if (props.wip) {
            const updatedWIP = props.user.workInProg.filter(
                (v) => v.route !== props.via.route_id
            )
            const updatedUser = { ...props.user, workInProg: updatedWIP }
            try {
                await usersServices.updateFavs(updatedUser)
                dispatch(setUser(updatedUser))
                window.localStorage.setItem(
                    'loggedUser',
                    JSON.stringify(updatedUser)
                )
            } catch (e) {
                console.log(e)
            }
        } else {
            const updatedWIP = props.user.workInProg.concat({ ...props.via })
            let updatedUser = {}
            if (
                props.user.completedRoutes.find(
                    (element) => element.route === props.via.route_id
                )
            ) {
                const updatedCompleted = props.user.completedRoutes.filter(
                    (v) => (v.route === props.via.route_id ? null : v)
                )
                updatedUser = {
                    ...props.user,
                    workInProg: updatedWIP,
                    completedRoutes: updatedCompleted,
                }
            } else {
                updatedUser = { ...props.user, workInProg: updatedWIP }
            }
            try {
                await usersServices.updateFavs(updatedUser)

                window.localStorage.setItem(
                    'loggedUser',
                    JSON.stringify(updatedUser)
                )
                dispatch(setUser(updatedUser))
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <ToggleButton value="check" selected={props.wip} onClick={onClick}>
            <SportsGymnasticsOutlinedIcon />
        </ToggleButton>
    )
}

export default WIPButton
