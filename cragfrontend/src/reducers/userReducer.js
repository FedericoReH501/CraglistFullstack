import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        updateRegions(state, action) {
            return action.payload
        },
    },
})

export const { setUser, updateRegions } = userSlice.actions
export default userSlice.reducer
