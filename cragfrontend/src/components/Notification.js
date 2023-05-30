import { Typography, Box, Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    return (
        <Box>
            {notification && (
                <Box>
                    <Alert severity={notification.severity}>
                        {notification.message}
                    </Alert>
                </Box>
            )}
        </Box>
    )
}

export default Notification
