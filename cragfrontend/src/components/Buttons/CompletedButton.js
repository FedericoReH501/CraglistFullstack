import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material'
import FlashIcon from '@mui/icons-material/Bolt'
import EyeIcon from '@mui/icons-material/RemoveRedEye'
import BoyIcon from '@mui/icons-material/Boy'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'
import gradeList, {
    numLevel,
    isLevelUp,
    levelFind,
    isLevelDown,
} from '../../utils/gradeList'

const CompletedButton = (props) => {
    console.log(gradeList[13])
    const dispatch = useDispatch()
    const numericGrade = numLevel(props.via.grade)
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

            let updatedUser = {
                ...props.user,
                completedRoutes: updatedCompleted,
            }
            if (
                isLevelDown(
                    props.user.level,
                    props.user.completedRoutes,
                    props.via
                )
            ) {
                updatedUser = {
                    ...updatedUser,
                    level: levelFind(updatedCompleted),
                }
                console.log('new level :', levelFind(updatedCompleted))
                dispatch(
                    setNotification({
                        message: `:( level down`,
                        severity: 'info',
                    })
                )
                setTimeout(() => {
                    dispatch(setNotification(null))
                }, 2500)
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
            if (
                isLevelUp(numericGrade, levelFind(props.user.completedRoutes))
            ) {
                updatedUser = { ...updatedUser, level: numericGrade }
                dispatch(
                    setNotification({
                        message: `Congratulation, Level Up!`,
                        severity: 'success',
                    })
                )
                setTimeout(() => {
                    dispatch(setNotification(null))
                }, 2500)
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
