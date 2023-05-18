const fullGradeRangeGenerator = ()=>{
  const array =[]
  for (let i = 4; i < 10; i++) {
    
    array.push(`${i}a`)
    array.push(`${i}a+`)
    array.push(`${i}b`)
    array.push(`${i}b+`)
    array.push(`${i}c`)
    array.push(`${i}c+`)
  }
  return array
}

const initialeFilter={show:false,region:null,range:fullGradeRangeGenerator()}

const cragsFilterReducer = (state=initialeFilter,action)=>{
  switch(action.type){
    case 'FILTER_GRADE':
      return {...state,range:action.payload}
    default:
      return state
  }
}

export default cragsFilterReducer