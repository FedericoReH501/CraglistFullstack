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

const WipRoutes = (props) => {
    const theme = useTheme()
    const user = useSelector((s) => s.user)
    if (!user) {
        return null
    }

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
            <Box>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 'bold',
                    }}
                >
                    W.I.P routes
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.workInProg.map((element) => (
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
