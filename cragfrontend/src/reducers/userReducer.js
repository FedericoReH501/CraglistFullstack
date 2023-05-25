import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
  name:'user',
  initialState:null,
  reducers:{
    setUser(state,action){
      return action.payload
    },
    updateRegions(state,action){
      return action.payload
    }
  }
})


const userReducer= (state=null,action)=>{
  switch(action.type){
    case 'SET_USER':
      
      return action.payload
    case 'UPDATE_REGIONS':
      return action.payload
    default:
      return state
  }
}
export const {setUser,updateRegions} = userSlice.actions
export default userSlice.reducer