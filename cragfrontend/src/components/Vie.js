import {
    Box,
    Paper,
    Typography,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    Table,
    TableBody,
    Slide,
    useTheme,
} from '@mui/material'
import { Link, useParams } from 'react-router-dom'

import CompletedButton from './Buttons/CompletedButton'
import WIPButton from './Buttons/WIPButton'
import { useSelector } from 'react-redux'
import Notification from './Notification'
import { useState } from 'react'

const Vie = (props) => {
    const theme = useTheme()
    const selectedCrag = useParams().crag
    const user = useSelector((s) => s.user)
    const completedRoutes = user ? user.completedRoutes : []
    const workInProg = user ? user.workInProg : []
    const isRouteCompleted = (routeId) => {
        let result = null
        completedRoutes.forEach((completedRoute) => {
            if (completedRoute.route._id === routeId) {
                result = completedRoute.completionType
            }
        })
        return result
    }
    const isWIP = (via) => {
        if (workInProg.find((v) => v.route._id === via._id)) {
            return true
        }

        return false
    }

    const crag = props.cragsList.find((c) => c.name === selectedCrag)

    if (crag) {
        return (
            <Slide in={true} direction="left" mountOnEnter unmountOnExit>
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
                    <Notification></Notification>
                    <Box>
                        {crag.sectors.map((s) => (
                            <Box key={s._id}>
                                <Box sx={{ py: 4 }}>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {s.sectorName}
                                    </Typography>
                                </Box>

                                <TableContainer
                                    sx={{
                                        borderRadius: 4,
                                        maxHeight: '50vh',
                                        '& .MuiTableCell-head': {
                                            color: theme.palette.primary.main,
                                            fontWeight: 'bold',
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
                                                        Name
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> Grade</TableCell>
                                                <TableCell>
                                                    <Typography
                                                        variant="h6"
                                                        fontWeight="bold"
                                                    >
                                                        Work in Prog.
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        variant="h6"
                                                        fontWeight="bold"
                                                    >
                                                        Completed
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {s.vie.map((v, index) => (
                                                <TableRow
                                                    key={`${v.name}${s.sectorName}${index}`}
                                                >
                                                    <TableCell>
                                                        {v.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {v.grade}
                                                    </TableCell>
                                                    <TableCell>
                                                        <WIPButton
                                                            isCompleted={isRouteCompleted(
                                                                v._id
                                                            )}
                                                            isWip={isWIP(v)}
                                                            user={user}
                                                            crag={crag._id}
                                                            sector={s._id}
                                                            via={v}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <CompletedButton
                                                            isWip={isWIP(v)}
                                                            isCompleted={isRouteCompleted(
                                                                v._id
                                                            )}
                                                            user={user}
                                                            crag={crag._id}
                                                            sector={s._id}
                                                            via={v}
                                                            wip={workInProg}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            </Slide>
        )
    }
}

export default Vie
