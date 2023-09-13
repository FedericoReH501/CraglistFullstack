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
export const isLevelDown = (userLv, completed, route) => {
    if (userLv === route.grade) {
        return false
    }
    const list = completed.filter((e) => e.route._id !== route._id)
    const completedGrade = completedGradeList(list).sort()
    console.log(completedGrade.slice(-1), '-vs-', userLv)
    const result = completedGrade.slice(-1) < userLv
    return result
}
const completedGradeList = (completed) => {
    let list = []
    completed.forEach((element) => list.push(numLevel(element.route.grade)))
    return list
}
export const levelFind = (completed) => {
    let bestGrade = 0

    completed.forEach((element) => {
        const grade = numLevel(element.route.grade)

        if (grade > bestGrade) {
            bestGrade = grade
        }
    })
    console.log('bestgrade: ', bestGrade)
    return bestGrade
}

export const leveCheck = (completed) => {}

export default gradeList
