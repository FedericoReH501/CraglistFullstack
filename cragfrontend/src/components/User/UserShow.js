import { useSelector } from 'react-redux'
import {
    Typography,
    Box,
    Avatar,
    Paper,
    Card,
    CardContent,
    CardHeader,
    Slider,
    Grid,
    LinearProgress,
} from '@mui/material'
import gradeList from '../../utils/gradeList'
function stringToColor(string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff
        color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
}

const UserShow = () => {
    const user = useSelector((s) => s.user)

    return user ? (
        <Paper
            elevation={0}
            sx={{ p: 12, display: 'flex', flexDirection: 'column' }}
        >
            <Card sx={{ width: '50vw' }}>
                <CardHeader
                    title={user.username}
                    avatar={
                        <Avatar
                            {...stringAvatar(`${user.username} ${user.name}`)}
                        />
                    }
                />
                <CardContent>
                    <Grid container sx={{ alignItems: 'center' }}>
                        <Grid item sm={1} xs={1} lg={1}>
                            <Typography variant="body2">Lv:</Typography>
                        </Grid>

                        <Grid item sm={11} lg={10} xs={11}>
                            <LinearProgress
                                variant="determinate"
                                value={user.level}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={1}
                            sx={{ justifyContent: 'end' }}
                        >
                            <Typography>{gradeList[user.level]}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Paper>
    ) : null
}

export default UserShow
