import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material'
import FlashIcon from '@mui/icons-material/Bolt'
import EyeIcon from '@mui/icons-material/RemoveRedEye'
import BoyIcon from '@mui/icons-material/Boy'
import { useDispatch } from 'react-redux'
import { updateUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import gradeList, { numLevel, isLevelUp } from '../utils/gradeList'

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
            console.log('already completed')
            console.log('before: ', props.user.completedRoutes.length)
            const updatedCompleted = props.user.completedRoutes.filter(
                (v) => v.route._id !== props.via._id
            )
            console.log('after: ', updatedCompleted.length)
            const updatedUser = {
                ...props.user,
                completedRoutes: updatedCompleted,
            }

            dispatch(updateUser(updatedUser))
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
                    return element.route._id !== props.via._id
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

            dispatch(updateUser(updatedUser))
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
