import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setRegion } from '../reducers/cragsFilterReducer'
import usersServices from '../services/users'
import { Grid, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
import Region from './Region'
import Notification from './Notification'

const allregions = [
    'Abruzzo',
    'Basilicata',
    'Calabria',
    'Campania',
    'Emilia Romagna',
    'Friuli venezia giulia',
    'Lazio',
    'Liguria',
    'Lombardia',
    'Marche',
    'Molise',
    'Piemonte',
    'Puglia',
    'Sardegna',
    'Sicilia',
    'Toscana',
    'Trentino alto adige',
    'Umbria',
    "Val d'Aosta",
]
const allRegions = allregions.map((r) => r.toLocaleLowerCase())
const Regions = () => {
    const params = useParams()
    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()
    if (user) {
        console.log('user:', user)
    }
    const favoritesRegionsRaw = user ? user.favoritesRegions : []
    const favoritesRegions = favoritesRegionsRaw.map((r) => r.toLowerCase())

    const regions =
        favoritesRegions === []
            ? allRegions
            : [
                  ...favoritesRegions,
                  ...allRegions.filter((r) => !favoritesRegions.includes(r)),
              ]

    const isFavourite = (region) => {
        if (favoritesRegions.includes(region)) return true
        else {
            return false
        }
    }
    const updateFavs = async (regions, user) => {
        // eslint-disable-next-line no-unused-vars
        const response = await usersServices.updateFavs(regions, user)
    }

    const handleFav = async (region) => {
        let newFavs = []
        if (!isFavourite(region)) {
            newFavs = favoritesRegions.concat(region)
        } else {
            newFavs = favoritesRegions.filter((r) => r !== region)
        }
        const updateduser = { ...user, favoritesRegions: newFavs }
        dispatch(setUser(updateduser))
        window.localStorage.setItem('loggedUser', JSON.stringify(updateduser))
        await updateFavs(user, newFavs)
    }

    const findCrags = async (region) => {
        //const cragList = await cragsService.getByRegion(region)
        dispatch(setRegion(region))
        //window.localStorage.setItem('filteredcraglist',JSON.stringify(cragList))
    }

    if (params.region) {
        return (
            <Paper>
                <Region
                    region={params.region}
                    handleFav={handleFav}
                    findCrags={findCrags}
                    updateFavs={updateFavs}
                    isFavourite={isFavourite}
                />
            </Paper>
        )
    }
    return (
        <Paper elevation={5} sx={{ borderradius: 5, p: 2 }}>
            <Notification />
            <Grid container spacing={2} my={2}>
                {regions.map((region) => (
                    <Grid
                        key={region}
                        item
                        md={4}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Region
                            region={region}
                            handleFav={handleFav}
                            findCrags={findCrags}
                            updateFavs={updateFavs}
                            isFavourite={isFavourite}
                        />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}

export default Regions
