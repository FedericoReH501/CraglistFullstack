import { useSelector } from "react-redux"
const numVie = (crag)=>{
  return null
}
const gradeRange = (crag)=>{
  return null
}

const Crags = (props)=>{
  const state = useSelector(state=> state.crags)
  const filter = useSelector(state=> state.filter)
  const cragsList = state.cragsList.filter(crag=> crag.region === state.region.toUpperCase())
  
  const requestedRange = filter.range
  
  const allGradeGenerator =(crag)=>{
    const allGrade=[]
    crag.sectors.forEach(sector=>
      sector.vie.forEach(via=>{
        if(allGrade.includes(via.grade) || via.grade=== '' || via.grade ===' '){
            return null
        }
        allGrade.push(via.grade)
        allGrade.sort()
        })
      )
    return allGrade
}

const gradeListGenerator=(crag,allGrade)=>{
  let counter=0
  let result = []
  allGrade.forEach(grade=>{
      crag.sectors.forEach(sector=>
          sector.vie.forEach(via=>{
            if(grade===via.grade){
                counter++
            }
        }
        ))
      let object ={
          grade: grade,
          ammount:counter
      }
      result.push(object)
      counter=0
  })
  return result
}

const gradeMatcher= (requested,gradeList)=>{
    let point = 0
    requested.forEach(req=>{
        gradeList.forEach(via=>{
            if(via.grade === req){
                point += via.ammount
            }
        })
    })
    return point
}

const pointCalculator = (crag)=>{
  const allGrade = allGradeGenerator(crag)
  const gradeList = gradeListGenerator(crag,allGrade)
  return gradeMatcher(requestedRange,gradeList)
}

const comparer = (b,a)=>{
  let pointa= pointCalculator(a)
  let pointb = pointCalculator(b)
  return pointa - pointb
}
function scale (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

  if(cragsList){
    cragsList.sort(comparer)
    let element=-1
    return (
    <div style={{textAlign:'center',padding:'20vh'}}>
      <div>
      {cragsList.map(crag=>
          <div key={crag.id}>
            <p style={{fontSize:scale(pointCalculator(crag),0,100,10,20)   }}>{crag.name}{gradeRange(crag)}</p>
          </div>
        )}
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
  }
  
}

export default Crags