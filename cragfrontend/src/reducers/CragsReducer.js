import { createSlice, createAsyncThunk, immerCase } from '@reduxjs/toolkit'
import cragsServices from '../services/crags'

const initialState = {
    cragsList: [],
    isLoading: false,
    error: null,
}

const cragsSlice = createSlice({
    name: 'crags',
    initialState,
    reducers: {
        setCrags(state, action) {
            return { ...state, cragsList: action.payload }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCrags.pending, (state) => {
                console.log('PENIDIIIING!!')
                return {
                    isLoading: true,
                    cragsList: [],
                    error: null,
                }
            })
            .addCase(fetchCrags.fulfilled, (state, action) => {
                console.log('FULLFILLED!!')
                return {
                    isLoading: false,
                    cragsList: action.payload,
                    error: null,
                }
            })
    },
})
export const { setCrags } = cragsSlice.actions

export const fetchCrags = createAsyncThunk('crags/fetchCrags', async () => {
    console.log('fetching crags')
    try {
        const response = await cragsServices.getAll()
        window.localStorage.setItem('cragsList', JSON.stringify(response.data))
        console.log('response', response)
        return response.data
    } catch (e) {
        console.log('in the catch blocks')
        return e
    }
})
export const initializeCrags = () => {
    return async (dispatch) => {
        const cragsList = await cragsServices.getAll()
        dispatch(setCrags(cragsList))
    }
}
export default cragsSlice.reducer
