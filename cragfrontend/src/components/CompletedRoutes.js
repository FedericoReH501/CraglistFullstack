import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'

const CompletedRoutes = (props) => {
    const user = useSelector((s) => s.user)
    return (
        <Paper>
            {user.completedRoutes.map((element) => (
                <div key={element._id}>{element.crag}</div>
            ))}
        </Paper>
    )
}

export default CompletedRoutes
