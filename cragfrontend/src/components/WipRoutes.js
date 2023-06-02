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
import { useSelector } from 'react-redux'

const WipRoutes = (props) => {
    const user = useSelector((s) => s.user)
    if (!user) {
        return null
    }
    if (user) {
        console.log(user.completedRoutes)
    }

    return (
        <Paper>
            <Box>
                <Typography>W.I.P routes</Typography>
            </Box>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell> Name</TableCell>
                            <TableCell> Grade</TableCell>
                            <TableCell> Crag</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.completedRoutes.map((element) => (
                            <TableRow key={`${element.route._id}`}>
                                <TableCell>{element.route.name}</TableCell>
                                <TableCell>{element.route.grade}</TableCell>
                                <TableCell>
                                    {element.crag.name} - {element.crag.region}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default WipRoutes
