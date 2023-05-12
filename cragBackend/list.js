const listalazio =
[{
name:'Acuto (Placche di Pila Rocca)',
    vie : [{
        name:'Via delle streghe',
        grade:'6b',
    },
    {
        name:'Carlo 2011',
        grade:'6a+',
    },
    {
        name:'Piglio 98',
        grade:'6b',
    },
    {
        name:'Aurora team',
        grade:'6a+',
    },
    {
        name:'I fiuggiaschi',
        grade:'6b',
    },
    {
        name:'Linea Gullich',
        grade:'6c+',
    },
    {
        name:"L'araba fenicia",
        grade:'7b',
    },
    {
        name:'Non stop',
        grade:'6c+',
    },
    {
        name:'Stop and go!!!',
        grade:'7a',
    },
    {
        name:'Capravirus',
        grade:'5c+',
    },
    {
        name:'Cucuruccuccu L1',
        grade:'5c',
    },
    {
        name:'Paloma L1+L2',
        grade:'6b',
    },
    {
        name:'Pulce (ar)rapata',
        grade:'6c',
    },
    {
        name:'Pulce pelosa',
        grade:'5c',
    },
    {
        name:'Svaso ribelle',
        grade:'7a+',
    },
    {
        name:'Polvere e sudore',
        grade:'7b+',
    },
    
],
get numVie(){
    return this.vie.length
} ,

get allGrade(){
    let allGrade=[]
    this.vie.forEach(via=>{
        if(allGrade.includes(via.grade)){
            return null
        }
        allGrade.push(via.grade)
        allGrade.sort()
    })
    return allGrade
},
get gradeList(){
    let counter=0
    let result = []
    this.allGrade.forEach(grade=>{
        this.vie.forEach(via=>{
            if(grade==via.grade){
                counter++
            }
        })
        let object ={
            grade: grade,
            ammount:counter
        }
        result.push(object)
        counter=0
    })
    return result
},
gradeMatcher (requested){
    let point = 0
    requested.forEach(req=>{
        this.gradeList.forEach(via=>{
            if(via.grade === req){
                point += via.ammount
            }
        })
    })
    return point
},

esposizione:'',
regione:'lazio',
provincia:'frosinone',
parkingGPS:'',
locationGPS:[],
},
{
    name:'Amaseno (Burano)',
    vie : [{
        name:'Via delle streghe',
        grade:'6b',
    },
    {
        name:'Carlo 2011',
        grade:'6a+',
    },
    {
        name:'fintone',
        grade:'6b+',
    },
    {
        name:'fintone',
        grade:'6b+',
    },
    {
        name:'fintone',
        grade:'6b+',
    },
    {
        name:'fintone',
        grade:'6b+',
    },
    {
        name:'fintone',
        grade:'6b+',
    },
    {
        name:'fintone',
        grade:'6b+',
    },
    {
        name:'Piglio 98',
        grade:'6b',
    },
    {
        name:'Aurora team',
        grade:'6a+',
    },
    {
        name:'I fiuggiaschi',
        grade:'6b',
    },
    {
        name:'Linea Gullich',
        grade:'6c+',
    },
    {
        name:"L'araba fenicia",
        grade:'7b',
    },
    {
        name:'Non stop',
        grade:'6c+',
    },
    {
        name:'Stop and go!!!',
        grade:'7a',
    },
    {
        name:'Capravirus',
        grade:'5c+',
    },
    {
        name:'Cucuruccuccu L1',
        grade:'5c',
    },
    {
        name:'Paloma L1+L2',
        grade:'6b',
    },
    {
        name:'Pulce (ar)rapata',
        grade:'6c',
    },
    {
        name:'Pulce pelosa',
        grade:'5c',
    },
    {
        name:'Svaso ribelle',
        grade:'7a+',
    },
    {
        name:'Polvere e sudore',
        grade:'7b+',
    }
],
//numVie: this.vie.length,
get allGrade(){
    let allGrade=[]
    this.vie.forEach(via=>{
        if(allGrade.includes(via.grade)){
            return null
        }
        allGrade.push(via.grade)
        allGrade.sort()
    })
    return allGrade
},
get gradeList(){
    let counter=0
    let result = []
    this.allGrade.forEach(grade=>{
        this.vie.forEach(via=>{
            if(grade==via.grade){
                counter++
            }
        })
        let object ={
            grade: grade,
            ammount:counter
        }
        result.push(object)
        counter=0
    })
    return result
},
gradeMatcher (requested){
    let point = 0
    requested.forEach(req=>{
        this.gradeList.forEach(via=>{
            if(via.grade === req){
                point += via.ammount
            }
        })
    })
    return point
},

esposizione:'',
regione:'lazio',
provincia:'frosinone',
parkingGPS:'',
locationGPS:[],
},
{
    name:'',
    vie : [],
//numVie: this.vie.length,
esposizione:'',
regione:'lazio',
provincia:'frosinone',
parkingGPS:'',
locationGPS:[],
},
{
    name:'',
    vie : [],
//numVie: this.vie.length,
esposizione:'',
regione:'lazio',
provincia:'frosinone',
parkingGPS:'',
locationGPS:[],
},
{
    name:'',
    vie : [],
//numVie: this.vie.length,
esposizione:'',
regione:'lazio',
provincia:'frosinone',
parkingGPS:'',
locationGPS:[],
},
{
    name:'',
    vie : [],
//numVie: this.vie.length,
esposizione:'',
regione:'lazio',
provincia:'frosinone',
parkingGPS:'',
locationGPS:[],
},
{
    name:'',
    vie : [],
//numVie: this.vie.length,
esposizione:'',
regione:'lazio',
provincia:'frosinone',
parkingGPS:'',
locationGPS:[],
},
{
    name:'',
    vie : [],
//numVie: this.vie.length,
esposizione:'',
regione:'lazio',
provincia:'frosinone',
parkingGPS:'',
locationGPS:[],
},
{
    name:'',
    vie : [],
//numVie: this.vie.length,
esposizione:'',
regione:'lazio',
provincia:'frosinone',
parkingGPS:'',
locationGPS:[],
},
{
    name:'',
    vie : [],
//numVie: this.vie.length,
esposizione:'',
regione:'lazio',
provincia:'frosinone',
parkingGPS:'',
locationGPS:[],
},
{
    name:'',
    vie : [],
//numVie: this.vie.length,
esposizione:'',
regione:'lazio',
provincia:'frosinone',
parkingGPS:'',
locationGPS:[],
},
{
    name:'',
    vie : [],
//numVie: this.vie.length,
esposizione:'',
regione:'lazio',
provincia:'frosinone',
parkingGPS:'',
locationGPS:[],
},
]

const acuto = listalazio[0]
const amaseno = listalazio[1]
let cragGradeList = []
let allGrade=[]
const result =[]
let counter=0

const allGradeGenerator =(crag)=>{
    crag.vie.forEach(via=>{
        if(allGrade.includes(via.grade)){
            return null
        }
        allGrade.push(via.grade)
        allGrade.sort()
    })
}

/*const resultCreator=(allGrade)=>{
    allGrade.forEach(grade=>{
        acuto.vie.forEach(via=>{
            if(grade==via.grade){
                counter++
            }
        })
        let object ={
            grade: grade,
            ammount:counter
        }
        result.push(object)
        counter=0
    })
}
*/

const requestedRange = ['6b','6b+','6c']
console.log('acuto s point:')
console.log(acuto.gradeMatcher(requestedRange))
console.log('-----------')
console.log('amaseno s point:')
console.log(amaseno.gradeMatcher(requestedRange))


