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
import FlashIcon from '@mui/icons-material/Bolt'
import EyeIcon from '@mui/icons-material/RemoveRedEye'
import BoyIcon from '@mui/icons-material/Boy'

const Icon = ({ type }) => {
    switch (type) {
        case 'flash':
            return (
                <Box>
                    <FlashIcon />
                </Box>
            )
        case 'onSight':
            return (
                <Box>
                    <EyeIcon />
                </Box>
            )
        case 'normal':
            return (
                <Box>
                    <BoyIcon />
                </Box>
            )
        default:
            return null
    }
}

const CompletedRoutes = (props) => {
    const user = useSelector((s) => s.user)
    if (!user) {
        return null
    }
    if (user) {
        console.log(user.completedRoutes)
        user.completedRoutes.forEach((e) => {
            console.log(e._id)
        })
    }

    return (
        <Paper>
            <Box>
                <Typography>Completed routes</Typography>
            </Box>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell> Name</TableCell>
                            <TableCell> Grade</TableCell>
                            <TableCell> Crag</TableCell>
                            <TableCell
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                {' '}
                                Completed
                            </TableCell>
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
                                <TableCell
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Icon type={element.completionType}></Icon>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default CompletedRoutes
