import { useRef, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGradeFilter } from '../reducers/cragsFilterReducer'
import { Box, Slide, Slider, Paper } from '@mui/material'

const Filter = ({ gradeList }) => {
    const filter = useSelector((state) => state.filter)
    const dispatch = useDispatch()
    const boxRef = useRef()
    const value = filter.rawRange

    const filterMaker = (min, max) => {
        const result = []
        let inrange = false
        for (let index = 0; index < gradeList.length; index++) {
            const grade = gradeList[index]

            if (grade === min) {
                inrange = true
            }
            if (grade === max) {
                inrange = false
                result.push(grade)
            }
            if (inrange) {
                result.push(grade)
            }
        }
        return result
    }

    /*const marksGen=()=>{
    const result = []
    gradeList.forEach((e,i)=>{
      const mark = {value:i,label:e}
      result.push(mark)
    })
    return result
  }
  const marks = marksGen()*/

    return (
        <Slide
            in={true}
            direction="up"
            container={boxRef.current}
            mountOnEnter
            unmountOnExit
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '30vh',
                }}
                component={Paper}
            >
                <Box sx={{ flex: '1 1 100px', maxWidth: '80%' }}>
                    <Slider
                        max={35}
                        valueLabelDisplay="on"
                        valueLabelFormat={(x) => gradeList[x]}
                        value={value}
                        onChange={(e) => {
                            const range = e.target.value
                            const minGrade = gradeList[range[0]]
                            const maxGrade = gradeList[range[1]]
                            dispatch(
                                setGradeFilter([
                                    e.target.value,
                                    filterMaker(minGrade, maxGrade),
                                ])
                            )
                        }}
                    ></Slider>
                </Box>
            </Box>
        </Slide>
    )
}

export default memo(Filter)
