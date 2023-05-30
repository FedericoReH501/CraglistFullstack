import PinDropIcon from '@mui/icons-material/PinDrop'
import TourIcon from '@mui/icons-material/Tour'
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined'
import { Breadcrumbs, IconButton } from '@mui/material'

import { Link as RouterLink, useLocation, useParams } from 'react-router-dom'

function LinkRouter(props) {
    return <IconButton {...props} component={RouterLink} />
}

const BreadCrumb = () => {
    const iconsList = [
        <TourIcon key={1} />,
        <PinDropIcon key={2} />,
        <TerrainOutlinedIcon key={3} />,
    ]
    const params = Object.entries(useParams())
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x)
    console.log('pathname:', pathnames)
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <LinkRouter underline="hover" color="inherit" to="/">
                Home
            </LinkRouter>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1
                console.log('last index:', last)
                const to = `/${pathnames.slice(0, index + 1).join('/')}`
                console.log('to:', to)
                console.log('params:', params)

                return last ? (
                    <IconButton color="text.primary" key={to}>
                        {iconsList[index]}
                        {value}
                    </IconButton>
                ) : (
                    <LinkRouter
                        underline="hover"
                        color="inherit"
                        to={to}
                        key={to}
                    >
                        {iconsList[index]}
                        {value}
                    </LinkRouter>
                )
            })}
        </Breadcrumbs>
    )
}

export default BreadCrumb
