import { ToggleButton } from '@mui/material'
import SportsGymnasticsOutlinedIcon from '@mui/icons-material/SportsGymnasticsOutlined'
import { useState } from 'react'
import usersServices from '../services/users'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

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
            }, 2500)
            return null
        }
        if (props.wip) {
            const updatedWIP = props.wip.filter(
                (v) => v.name !== props.via.name
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
            if (props.user.completed.find((v) => v.name === props.via.name)) {
                const updatedCompleted = props.user.complete.filter((v) =>
                    v.name === props.via.name ? null : v
                )
                updatedUser = {
                    ...props.user,
                    workInProg: updatedWIP,
                    completed: updatedCompleted,
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
    console.log(props.wip)
    return (
        <ToggleButton value="check" selected={props.wip} onClick={onClick}>
            <SportsGymnasticsOutlinedIcon />
        </ToggleButton>
    )
}

export default WIPButton
