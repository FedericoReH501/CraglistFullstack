import { createSlice } from '@reduxjs/toolkit'

const cragsSlice = createSlice({
    name: 'crags',
    initialState: { cragsList: [] },
    reducers: {
        setCrags(state, action) {
            return { ...state, cragsList: action.payload }
        },
    },
})
export const { setCrags } = cragsSlice.actions
export default cragsSlice.reducer
