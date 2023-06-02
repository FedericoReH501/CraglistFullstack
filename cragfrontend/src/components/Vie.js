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
} from '@mui/material'
import { Link, useParams } from 'react-router-dom'

import CompletedButton from './CompletedButton'
import WIPButton from './WIPButton'
import { useSelector } from 'react-redux'
import Notification from './Notification'

const Vie = (props) => {
    const selectedCrag = useParams().crag
    const user = useSelector((s) => s.user)
    const completedRoutes = user ? user.completedRoutes : []
    const workInProg = user ? user.workInProg : []
    const routeIsCompleted = (route) => {
        if (completedRoutes.find((element) => element.route === route._id)) {
            return true
        }
        return false
    }

    const isCompleted = (via) => {
        let result = null
        completedRoutes.forEach((element) => {
            if (element.route._id === via._id) {
                result = element.completionType
            }
        })
        return result
    }
    const isWIP = (via) => {
        if (workInProg.find((v) => v.route === via._id)) {
            return true
        }

        return false
    }

    const crag = props.cragsList.find((c) => c.name === selectedCrag)
    console.log(crag)
    if (crag) {
        return (
            <Slide in={true} direction="up" mountOnEnter unmountOnExit>
                <Paper>
                    <Notification></Notification>
                    <Box>
                        {crag.sectors.map((s) => (
                            <Box key={s.sectorName}>
                                <Typography variant="h5">
                                    {s.sectorName}
                                </Typography>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell> Name</TableCell>
                                                <TableCell> Grade</TableCell>
                                                <TableCell>
                                                    {' '}
                                                    Work in Prog.
                                                </TableCell>
                                                <TableCell>
                                                    {' '}
                                                    Completed
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
                                                            isCompleted={routeIsCompleted(
                                                                v
                                                            )}
                                                            isWip={isWIP(v)}
                                                            user={user}
                                                            crag={crag._id}
                                                            via={v}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <CompletedButton
                                                            isWip={isWIP(v)}
                                                            completed={isCompleted(
                                                                v
                                                            )}
                                                            user={user}
                                                            crag={crag._id}
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
