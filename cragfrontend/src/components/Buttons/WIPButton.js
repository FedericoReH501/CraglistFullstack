import { ToggleButton } from '@mui/material'
import SportsGymnasticsOutlinedIcon from '@mui/icons-material/SportsGymnasticsOutlined'
import usersServices from '../../services/users'
import { useDispatch } from 'react-redux'
import { setUser, updateUser } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'

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
        if (props.isWip) {
            const updatedWIP = props.user.workInProg.filter(
                (v) => v.route._id !== props.via._id
            )
            const updatedUser = { ...props.user, workInProg: updatedWIP }
            dispatch(updateUser(updatedUser))
        } else {
            const updatedWIP = props.user.workInProg.concat({
                route: props.via._id,
                sector: props.sector,
                crag: props.crag,
            })
            let updatedUser = {}
            if (props.isCompleted) {
                const updatedCompleted = props.user.completedRoutes.filter(
                    (v) => v.route._id !== props.via._id
                )
                updatedUser = {
                    ...props.user,
                    workInProg: updatedWIP,
                    completedRoutes: updatedCompleted,
                }
            } else {
                updatedUser = { ...props.user, workInProg: updatedWIP }
            }
            dispatch(updateUser(updatedUser))
        }
    }

    return (
        <ToggleButton value="check" selected={props.isWip} onClick={onClick}>
            <SportsGymnasticsOutlinedIcon />
        </ToggleButton>
    )
}

export default WIPButton
