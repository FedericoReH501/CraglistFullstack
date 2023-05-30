import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
    },
})

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer
