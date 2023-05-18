const showCragsReducer= (state = {show:false,region:null,cragsList:[]}, action)=>{
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
export default showCragsReducer