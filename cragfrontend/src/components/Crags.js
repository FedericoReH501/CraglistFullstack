import { useSelector } from 'react-redux'
import {
    Slide,
    Paper,
    Typography,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    Table,
    TableBody,
    Button,
    useTheme,
    Box,
    Grid,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useState } from 'react'

function getCardinalDirection(exposure) {
    if (exposure) {
        const regex =
            /\b(?:nord(?:[-/]?est)?|tutto|sole|ombra|est|sud(?:[-/]?est|[-/]?ovest)?|ovest(?:[-/]?est)?)(?:\s(?:nord(?:[-/]?est)?|est|sud(?:[-/]?est|[-/]?ovest)?|ovest(?:[-/]?est)?))*\b/gi

        const matches = exposure.match(regex)

        if (matches && matches.length > 0) {
            const cardinalDirections = matches
                ? matches.map((match) => match.toUpperCase())
                : []
            console.log(cardinalDirections) // Output: ['OVEST', 'SUD-OVEST']
            if (cardinalDirections.length === 1) {
                return cardinalDirections[0]
            }
            if (cardinalDirections.length >= 2) {
                return `${cardinalDirections[0]}/${cardinalDirections[1]}`
            }
        }
    }

    return 'No Data'
}
const ExposureIcon = ({ exposure }) => {
    const cardinalDirection = getCardinalDirection(exposure)
    console.log('cardinal direction: ', cardinalDirection)
    if (cardinalDirection === 'SUD') {
        console.log('trueeeeeeeee')
        return 'SEMPRE'
    } else if (
        cardinalDirection === 'SUD-EST' ||
        cardinalDirection === 'SUD/SUD-EST'
    ) {
        console.log('trueeeeeeeee')
        return 'MATTINA PRESTO'
    } else if (
        cardinalDirection === 'SUD-OVEST' ||
        cardinalDirection === 'SUD/SUD-OVEST'
    ) {
        console.log('trueeeeeeeee')
        return 'PRIMO POME'
    } else if (cardinalDirection === 'EST' || cardinalDirection === 'SUD-EST') {
        console.log('trueeeeeeeee')
        return 'MATTINA'
    } else if (
        cardinalDirection === 'EST/NORD EST' ||
        cardinalDirection === 'EST/NORD-EST'
    ) {
        console.log('trueeeeeeeee')
        return 'MATTINA PRESTO'
    } else if (cardinalDirection === 'OVEST') {
        console.log('trueeeeeeeee')
        return 'POME'
    } else if (cardinalDirection === 'NORD') {
        console.log('trueeeeeeeee')
        return 'MAI'
    } else if (cardinalDirection === 'TUTTO') {
        console.log('trueeeeeeeee')
        return 'TUTTO'
    } else if (cardinalDirection === 'No Data') {
        console.log('trueeeeeeeee')
        return 'NO DATA'
    } else {
        return 'da formattare'
    }
}
const Crags = () => {
    const theme = useTheme()
    const params = useParams()

    const [slide, setslide] = useState(true)
    const cragsList = [
        ...useSelector(({ crags }) => {
            if (params.region) {
                return crags.cragsList.filter(
                    (crag) => crag.region === params.region.toUpperCase()
                )
            }
            return crags.cragsList
        }),
    ]

    const navigate = useNavigate()
    const filter = useSelector((state) => state.filter)

    const requestedRange = filter.range

    const gradeMatcher = (crag, requested) => {
        let point = 0
        let result = []
        requested.forEach((grade) => {
            crag.sectors.forEach((sector) =>
                sector.vie.forEach((via) => {
                    if (grade === via.grade) {
                        point++
                    }
                })
            )
            let object = {
                grade: grade,
                ammount: point,
            }
            result.push(object)
        })
        return [point, result]
    }

    const pointCalculator = (crag) => {
        return gradeMatcher(crag, requestedRange)[0]
    }

    const comparer = (b, a) => {
        let pointa = pointCalculator(a)
        let pointb = pointCalculator(b)
        return pointa - pointb
    }

    if (cragsList.length !== 0) {
        if (params.crag) {
            return (
                <Paper>
                    <Typography variant="h5">{params.crag}</Typography>
                </Paper>
            )
        }
        cragsList.sort(comparer)
        return (
            <Paper
                elevation={0}
                sx={{
                    overflow: 'hidden',
                    background: 'white',
                    mx: 12,
                    marginTop: 4,
                    borderRadius: 4,
                    [theme.breakpoints.down('md')]: {
                        mx: 0,
                    },
                }}
            >
                <Slide in={slide} direction="left" mountOnEnter unmountOnExit>
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            px: 2,
                        }}
                    >
                        <Grid item xs={12} lg={12}>
                            <Typography variant="body2">Symbols</Typography>
                        </Grid>
                        <Grid item xs={6} lg={3}>
                            <Typography variant="body2">
                                half sun : sun in the morning
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            lg={2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <Typography variant="body2">
                                full sun : sun all day long
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            lg={2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <Typography variant="body2">
                                half : sun in the afternoon
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            lg={2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <Typography variant="body2">
                                shadow : in shade all day long
                            </Typography>
                        </Grid>
                    </Grid>
                </Slide>

                <Slide in={slide} direction="right" mountOnEnter unmountOnExit>
                    <TableContainer
                        sx={{
                            borderRadius: 4,
                            maxHeight: '50vh',
                            '& .MuiTableCell-head': {
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
                                            Crags
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
                                            Exposition
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
                                            Avvicinamento
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
                                            Routes for You
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow></TableRow>
                            </TableHead>
                            <TableBody>
                                {cragsList.map((crag) => (
                                    <TableRow key={crag._id}>
                                        <TableCell>
                                            <Button
                                                onClick={() => {
                                                    navigate(`${crag.name}`)
                                                }}
                                            >
                                                {crag.name}
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{}}>
                                            <Typography>
                                                <ExposureIcon
                                                    exposure={crag.exposure}
                                                />
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                {crag.distance}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                {
                                                    gradeMatcher(
                                                        crag,
                                                        requestedRange
                                                    )[0]
                                                }
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Slide>
            </Paper>
        )
    }
}

export default Crags
