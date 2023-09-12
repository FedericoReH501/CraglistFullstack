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
    const theme = useTheme()
    const user = useSelector((s) => s.user)
    if (!user) {
        return null
    }
    if (user) {
        console.log(user.completedRoutes)
    }

    return (
        <Paper
            elevation={0}
            sx={{
                overflow: 'hidden',
            }}
        >
            <Box>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 'bold',
                    }}
                >
                    Completed routes
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
                            <TableCell> Name</TableCell>
                            <TableCell> Grade</TableCell>
                            <TableCell> Crag</TableCell>
                            <TableCell>Completed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.completedRoutes.map((element) => (
                            <TableRow key={`${element.route._id}`}>
                                <TableCell>
                                    {element.route.name}
                                    {`${element.route._id}`}
                                </TableCell>
                                <TableCell>{element.route.grade}</TableCell>
                                <TableCell>
                                    {element.crag.name} - {element.crag.region}
                                </TableCell>
                                <TableCell>
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
