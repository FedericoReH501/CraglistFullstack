import { createSlice } from '@reduxjs/toolkit'

const regionSlice = createSlice({
    name: 'region',
    initialState: null,
    reducers: {
        setTest(state, action) {
            console.log('TestReducer')
            return action.payload
        },
    },
})

export const { setTest } = regionSlice.actions
export default regionSlice.reducer
