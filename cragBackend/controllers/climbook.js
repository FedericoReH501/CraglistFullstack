const climbookRouter = require('express').Router()

const axios = require('axios')
const allRegions = [3,32,19,5,41,81,1,15,20,9,4,37,111,21,16,6,7,2,29,33]
let array=[]
const fetcher =async ()=>{
  for (let index = 0; index < allRegions.length; index++) {
    const element= allRegions[index]
    const result = await axios.get(`https://climbook.com/regioni/${element}`)
    array.push(result.data)
  }

}

climbookRouter.get('/',async (request,response)=>{
  //const result = await axios.get(`https://climbook.com/falesie`)
  await fetcher()
  
  response.status(200).send(array)
  array=[]
})
  

module.exports = climbookRouter