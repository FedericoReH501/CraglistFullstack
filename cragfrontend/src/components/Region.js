import { Button } from '@mui/material'
import LikeButton from './Buttons/LikeButton'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setRegion } from '../reducers/cragsFilterReducer'
import { setUser } from '../reducers/userReducer'
import usersServices from '../services/users'
import { setNotification } from '../reducers/notificationReducer'
const Region = (props) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const favoritesRegionsRaw = user ? user.favoritesRegions : []
    const favoritesRegions = favoritesRegionsRaw.map((r) => r.toLowerCase())
    const dispatch = useDispatch()

    const findCrags = (region) => {
        dispatch(setRegion(region))
    }

    const handleFav = async (region) => {
        if (!user) {
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
        let newFavs = []
        if (!isFavourite(region)) {
            newFavs = favoritesRegions.concat(region)
        } else {
            newFavs = favoritesRegions.filter((r) => r !== region)
        }
        try {
            const updateduser = { ...user, favoritesRegions: newFavs }
            await usersServices.updateFavs(updateduser)
            dispatch(setUser(updateduser))
            window.localStorage.setItem(
                'loggedUser',
                JSON.stringify(updateduser)
            )
        } catch (e) {
            dispatch(
                setNotification({
                    message: `${e.response.statusText}`,
                    severity: 'error',
                })
            )
            setTimeout(() => {
                dispatch(setNotification(null))
            }, 2500)
        }
    }

    const isFavourite = (region) => {
        if (favoritesRegions.includes(region)) return true
        else {
            return false
        }
    }

    return (
        <div>
            <LikeButton
                type={props.region}
                handleFav={handleFav}
                isFavourite={isFavourite}
            />
            <Button
                onClick={() => {
                    navigate(`/finder/italy/${props.region.toLowerCase()}`)
                    findCrags(props.region)
                }}
            >
                {props.region}
            </Button>
        </div>
    )
}

export default Region
