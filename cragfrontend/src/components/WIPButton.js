import { ToggleButton } from '@mui/material'
import SportsGymnasticsOutlinedIcon from '@mui/icons-material/SportsGymnasticsOutlined'
import { useState } from 'react'
import usersServices from '../services/users'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const WIPButton = (props) => {
    const dispatch = useDispatch()

    const [selected, setselected] = useState(false)

    const onChange = async () => {
        /*if (props.wip.find((v) => v.name === props.via.name)) {
            const updatedWIP = props.wip.filter(
                (v) => v.name !== props.via.name
            )
            const updatedUser = { ...props.user, workInProg: updatedWIP }
            await usersServices.updateFavs(updatedUser)
            setselected(false)
            dispatch(setUser(updatedUser))
            window.localStorage.setItem(
                'loggedUser',
                JSON.stringify(updatedUser)
            )
        } else {
            const updatedWIP = props.wip.concat({ ...props.via })
            const updatedUser = { ...props.user, workInProg: updatedWIP }
            await usersServices.updateFavs(updatedUser)
            setselected(true)
            dispatch(setUser(updatedUser))
            window.localStorage.setItem(
                'loggedUser',
                JSON.stringify(updatedUser)
            )
        }*/
        return null
    }

    return (
        <ToggleButton value="check" selected={selected} onChange={onChange}>
            <SportsGymnasticsOutlinedIcon />
        </ToggleButton>
    )
}

export default WIPButton
