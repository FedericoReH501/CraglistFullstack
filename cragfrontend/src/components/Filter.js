import { useState,useRef } from "react"
import {useDispatch} from 'react-redux'
var classNames = require('classnames')

const Filter = ()=>{
  const dispatch = useDispatch()
  const min =0
  const max = 1000
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef();
  const maxValRef = useRef();
  const range = useRef()
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
  
  function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }
  const gradeList = fullGradeRangeGenerator()
  const minGrade = gradeList[Math.round(scale(minVal,0,1000,0,35))]
  const maxGrade = gradeList[Math.round(scale(maxVal,0,1000,0,35))]
  
  const filterMaker = (min,max)=>{
    const result = []
    let inrange = false
    for (let index = 0; index < gradeList.length; index++) {
      
      const grade = gradeList[index]
      
      if(grade === min){
        inrange = true
      }
      if(grade === max){
        inrange = false
        result.push(grade)
      }
      if(inrange){
        result.push(grade)
      }
    }
    return result
  }
  
  return(
  <div className="filter">
    <div className="filterbox">
      <div className="range">
        <input
          className={classNames('thumb zindex-3',{'zindex-5':minVal > max - 100})}
          type="range"
          min={min}
          max={max}
          ref={minValRef}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 100);
            setMinVal(value)
            dispatch({type:'FILTER_GRADE',payload:filterMaker(minGrade,maxGrade)})
            event.target.value = value.toString()
          }}
          />
          <input
            className="thumb zindex-4"
            type="range"
            value={maxVal}
            min={min}
            max={max}
            ref={maxValRef}
            onChange={(event) => {
              const value = Math.max(+event.target.value, minVal + 100);
              setMaxVal(value)
              dispatch({type:'FILTER_GRADE',payload:filterMaker(minGrade,maxGrade)})
              event.target.value = value.toString();
            }}
          />
        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>
        <div className="minlabel">
          <p>Min:{minGrade}</p>
          
        </div>
        <div className="maxlabel">
          <p>Max:{maxGrade}</p>
        </div>
      
        
    </div>
  </div>
  )
}

export default Filter