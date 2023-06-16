import PinDropIcon from '@mui/icons-material/PinDrop'
import TourIcon from '@mui/icons-material/Tour'
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined'
import { Breadcrumbs, IconButton, useTheme } from '@mui/material'

import { Link as RouterLink, useLocation, useParams } from 'react-router-dom'

function LinkRouter(props) {
    return <IconButton {...props} component={RouterLink} />
}

const BreadCrumb = () => {
    const theme = useTheme()
    const iconsList = [
        <TourIcon key={1} />,
        <PinDropIcon key={2} />,
        <TerrainOutlinedIcon key={3} />,
    ]

    const location = useLocation()

    const pathnames = location.pathname.split('/').filter((x) => x)

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
                marginTop: 12,
                [theme.breakpoints.down('md')]: {
                    mx: 0,
                },
            }}
        >
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1

                const to = `/${pathnames.slice(0, index + 1).join('/')}`

                return last ? (
                    <IconButton color="text.primary" key={to}>
                        {iconsList[index]}
                        {value.toUpperCase().replaceAll('%20', ' ')}
                    </IconButton>
                ) : (
                    <LinkRouter
                        underline="hover"
                        color="inherit"
                        to={to}
                        key={to}
                    >
                        {iconsList[index]}
                        {value.toUpperCase()}
                    </LinkRouter>
                )
            })}
        </Breadcrumbs>
    )
}

export default BreadCrumb
