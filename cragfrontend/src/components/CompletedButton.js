import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material'
import FlashIcon from '@mui/icons-material/Bolt'
import EyeIcon from '@mui/icons-material/RemoveRedEye'
import BoyIcon from '@mui/icons-material/Boy'
import { useState } from 'react'
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
            const updatedCompleted = props.user.completed.filter(
                (v) => v.name !== props.via.name
            )
            const updatedUser = { ...props.user, completed: updatedCompleted }
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
            const updatedCompleted = props.user.completed.concat({
                ...props.via,
                how: newValue,
            })
            let updatedUser = {}
            if (props.user.workInProg.find((v) => v.name === props.via.name)) {
                const workInProg = props.user.workInProg.filter((v) =>
                    v.name === props.via.name ? null : v
                )
                updatedUser = {
                    ...props.user,
                    workInProg,
                    completed: updatedCompleted,
                }
            } else {
                updatedUser = {
                    ...props.user,
                    completed: updatedCompleted,
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
                <ToggleButton value={'OnSight'}>
                    <EyeIcon />
                </ToggleButton>
                <ToggleButton value={'Normal'}>
                    <BoyIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    )
}

export default CompletedButton
