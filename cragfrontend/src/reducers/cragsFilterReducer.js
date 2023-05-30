import { createSlice } from '@reduxjs/toolkit'

const initialFilter = { show: false, range: [], rawRange: [0, 35] }

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilter,
    reducers: {
        setGradeFilter(state, action) {
            console.log('reducer!')
            return {
                ...state,
                rawRange: action.payload[0],
                range: action.payload[1],
            }
        },
        setRegion(state, action) {
            return { ...state, region: action.payload, show: !state.show }
        },
        setShow(state) {
            return { ...state, show: !state.show }
        },
    },
})

export const { setGradeFilter, setRegion, setShow } = filterSlice.actions
export default filterSlice.reducer
