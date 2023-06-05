const gradeList = [
    '4a',
    '4a+',
    '4b',
    '4b+',
    '4c',
    '4c+',
    '5a',
    '5a+',
    '5b',
    '5b+',
    '5c',
    '5c+',
    '6a',
    '6a+',
    '6b',
    '6b+',
    '6c',
    '6c+',
    '7a',
    '7a+',
    '7b',
    '7b+',
    '7c',
    '7c+',
    '8a',
    '8a+',
    '8b',
    '8b+',
    '8c',
    '8c+',
    '9a',
    '9a+',
    '9b',
    '9b+',
    '9c',
    '9c+',
]
export const numLevel = (stringLv) => {
    return gradeList.indexOf(stringLv)
}

export const isLevelUp = (routeLv, userLv) => {
    return routeLv > userLv ? true : false
}

export const levelFind = (completed, newLv) => {
    let bestGrade = 0

    completed.forEach((element) => {
        const grade = element.route.grade
        if (grade > bestGrade) {
            bestGrade = grade
        }
    })

    return bestGrade
}
export const leveCheck = (completed) => {}

export default gradeList
