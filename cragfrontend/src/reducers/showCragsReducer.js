import { createSlice } from "@reduxjs/toolkit"
const showCragsReducer= (state = {cragsList:[]}, action)=>{
  switch(action.type){
    case 'SWITCH_CRAGS_VISIBILITY':
      console.log('switch state , craglist',state.cragsList)
      return {
        show:!state.show, 
        region: action.payload, 
        cragsList: state.cragsList}
    case 'SET_CRAGS':
      return {...state,cragsList:action.payload}
    default:
      return state
  }
}

const cragsSlice = createSlice({
  name:'crags',
  initialState:{cragsList:[]},
  reducers:{
    setCrags(state,action){
      return {...state,cragsList:action.payload}
    }
  }
})
export const {setCrags} = cragsSlice.actions
export default cragsSlice.reducer