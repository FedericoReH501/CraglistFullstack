import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import usersServices from '../services/users'
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
    extraReducers: (builder) => {
        builder.addCase(updateUser.fulfilled, (state, action) => {
            console.log('updated!')
            console.log(action.payload)
            window.localStorage.setItem(
                'loggedUser',
                JSON.stringify({
                    token: state.token,
                    ...action.payload,
                })
            ) /*
            return {
                token: state.token,
                ...action.payload,
            }*/
        })
    },
})
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (object) => {
        console.log('updating!!')
        try {
            const response = await usersServices.updateFavs(object)
            return response.data
        } catch (e) {}
    }
)

export const { setUser, updateRegions } = userSlice.actions
export default userSlice.reducer
